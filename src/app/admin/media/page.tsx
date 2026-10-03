'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface MediaItem {
  id: number;
  section: string;
  slot: string;
  device: string;
  url: string;
  alt_text: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

const SECTIONS = ['Hero', 'Philosophy', 'Story', 'Kitchen', 'Gallery', 'Experience', 'Locations'];

function MediaManagerInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionQuery = searchParams.get('section');

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSection, setFilterSection] = useState('Hero');
  const [filterDevice, setFilterDevice] = useState('All');

  // Sync URL ?section= query with the filter, redirect if missing
  useEffect(() => {
    if (sectionQuery) {
      const matched = SECTIONS.find(s => s.toLowerCase() === sectionQuery.toLowerCase());
      if (matched) {
        setFilterSection(matched);
      } else {
        router.replace('/admin/media?section=hero');
      }
    } else {
      router.replace('/admin/media?section=hero');
    }
  }, [sectionQuery, router]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadSection, setUploadSection] = useState('hero');
  const [uploadSlot, setUploadSlot] = useState('');
  const [uploadDevice, setUploadDevice] = useState('desktop');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadSort, setUploadSort] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Sync upload modal section default to current filter
  useEffect(() => {
    if (filterSection !== 'All') {
      setUploadSection(filterSection.toLowerCase());
    }
  }, [filterSection]);

  // Edit Form State
  const [editAlt, setEditAlt] = useState('');
  const [editSlot, setEditSlot] = useState('');
  const [editSort, setEditSort] = useState(0);
  const [editActive, setEditActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 2000;
          const MAX_HEIGHT = 2000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
              resolve(new File([blob], newName, { type: 'image/webp' }));
            } else {
              resolve(file);
            }
          }, 'image/webp', 0.85);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    try {
      // 1. Compress image client-side to save bandwidth and ensure fast loading
      const compressedFile = await compressImage(uploadFile);

      // 2. Upload to storage
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('section', uploadSection);
      formData.append('device', uploadDevice);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(`Upload failed (${uploadRes.status}): ${errData.error || 'Unknown error'}`);
      }
      const { r2_key, url } = await uploadRes.json();

      // 2. Create media record
      const mediaRes = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: uploadSection,
          slot: uploadSlot,
          device: uploadDevice,
          r2_key,
          url,
          alt_text: uploadAlt,
          sort_order: uploadSort
        })
      });

      if (!mediaRes.ok) {
        const errData = await mediaRes.json().catch(() => ({}));
        throw new Error(`Save failed (${mediaRes.status}): ${errData.error || 'Unknown error'}`);
      }
      
      // Success -> Close and refresh
      setIsUploadModalOpen(false);
      resetUploadForm();
      fetchMedia();
    } catch (err: any) {
      console.error('Upload error:', err);
      alert(err.message || 'Failed to upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/media/${editingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alt_text: editAlt,
          slot: editSlot,
          sort_order: editSort,
          is_active: editActive
        })
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        fetchMedia();
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update.');
    } finally {
      setIsSaving(false);
    }
  };

  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/media/${itemToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaItems(items => items.filter(item => item.id !== itemToDelete));
        setItemToDelete(null);
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unknown server error' }));
        alert(`Failed to delete media: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Network error: ${err}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setEditAlt(item.alt_text || '');
    setEditSlot(item.slot || '');
    setEditSort(item.sort_order || 0);
    setEditActive(item.is_active ?? true);
    setIsEditModalOpen(true);
  };

  const resetUploadForm = () => {
    setUploadFile(null);
    setUploadSlot('');
    setUploadAlt('');
    setUploadSort(0);
  };

  const filteredMedia = mediaItems.filter(item => {
    if (filterSection !== 'All' && item.section.toLowerCase() !== filterSection.toLowerCase()) return false;
    if (filterDevice !== 'All' && item.device.toLowerCase() !== filterDevice.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
        
        {/* Filters and Title */}
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {filterSection === 'All' ? 'All Media' : `${filterSection} Media`}
          </h2>

          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            {['All', 'Desktop', 'Mobile'].map(dev => (
              <button
                key={dev}
                onClick={() => setFilterDevice(dev)}
                className={`px-4 py-1 rounded-md text-sm transition-colors ${
                  filterDevice === dev 
                    ? 'bg-gray-100 text-gray-900 font-bold shadow' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {dev}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#C41E2A] hover:bg-[#a01822] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          <span>Upload New</span>
        </button>
      </div>

      {/* Main Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-[#DF3B4D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filterSection.toLowerCase() === 'philosophy' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {[
            { id: 'slide_1', name: 'Chinese' },
            { id: 'slide_2', name: 'Korean' },
            { id: 'slide_3', name: 'Japanese' },
            { id: 'slide_4', name: 'Tibetan' }
          ].map(cuisine => {
            const items = filteredMedia.filter(m => m.slot === cuisine.id);
            return (
              <div key={cuisine.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm">{cuisine.name}</h3>
                  <button 
                    onClick={() => {
                      setUploadSection('philosophy');
                      setUploadSlot(cuisine.id);
                      setIsUploadModalOpen(true);
                    }}
                    className="text-xs bg-[#C41E2A] text-white px-3 py-1 rounded hover:bg-[#a01822] transition-colors"
                  >
                    + Add
                  </button>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-4 bg-gray-50/50">
                  {items.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                      No images for {cuisine.name} yet.
                    </div>
                  ) : (
                    items.map(item => {
                      const isVideo = item.url.toLowerCase().endsWith('.mp4') || item.url.toLowerCase().endsWith('.webm');
                      return (
                        <div key={item.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden group hover:border-[#DF3B4D] transition-colors">
                          <div className="relative aspect-[4/3] bg-white">
                            {isVideo ? (
                              <video src={item.url} autoPlay loop muted playsInline className={`w-full h-full object-cover ${!item.is_active ? 'opacity-50 grayscale' : ''}`} />
                            ) : (
                              <img src={item.url} alt={item.alt_text || 'Media item'} className={`w-full h-full object-cover ${!item.is_active ? 'opacity-50 grayscale' : ''}`} />
                            )}
                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => openEditModal(item)} className="p-2 bg-black/60 hover:bg-[#DF3B4D] text-white rounded-lg backdrop-blur-sm transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteClick(item.id)} className="p-2 bg-black/60 hover:bg-[#C41E2A] text-white rounded-lg backdrop-blur-sm transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </div>
                          <div className="p-3 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">{item.device}</span>
                              {!item.is_active && <span className="text-[#C41E2A] text-xs">Inactive</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-xl border border-gray-200 border-dashed">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <h3 className="text-xl text-gray-900 font-medium">No media found</h3>
          <p className="text-gray-500 mt-2">Adjust your filters or upload new media.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map(item => {
            const isVideo = item.url.toLowerCase().endsWith('.mp4') || item.url.toLowerCase().endsWith('.webm');
            return (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-[#DF3B4D] transition-colors">
              <div className="relative aspect-[4/3] bg-white">
                {isVideo ? (
                  <video src={item.url} autoPlay loop muted playsInline className={`w-full h-full object-cover ${!item.is_active ? 'opacity-50 grayscale' : ''}`} />
                ) : (
                  <img src={item.url} alt={item.alt_text || 'Media item'} className={`w-full h-full object-cover ${!item.is_active ? 'opacity-50 grayscale' : ''}`} />
                )}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(item)} className="p-2 bg-black/60 hover:bg-[#DF3B4D] text-white rounded-lg backdrop-blur-sm transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDeleteClick(item.id)} className="p-2 bg-black/60 hover:bg-[#C41E2A] text-white rounded-lg backdrop-blur-sm transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-900 font-bold text-xs font-bold uppercase tracking-wider">{item.section}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{item.device}</span>
                </div>
                <p className="text-gray-900 text-sm font-medium truncate" title={item.slot}>{item.slot || 'Unnamed Slot'}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Order: {item.sort_order || 0}</span>
                  {!item.is_active && <span className="text-[#C41E2A]">Inactive</span>}
                </div>
              </div>
            </div>
          );

          })}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-900">
                Upload to {filterSection}
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              
              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">File (Image or Video)</label>
                <input 
                  type="file" 
                  accept="image/*,video/mp4,video/webm"
                  onChange={e => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-900 font-bold hover:file:bg-gray-200 cursor-pointer"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Device</label>
                <select value={uploadDevice} onChange={e => setUploadDevice(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg">
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Slot Name (e.g. main, bg, slide_1)</label>
                <input type="text" value={uploadSlot} onChange={e => setUploadSlot(e.target.value)} required className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" placeholder="hero_main_img" />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Alt Text</label>
                <input type="text" value={uploadAlt} onChange={e => setUploadAlt(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" placeholder="Description for SEO" />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Sort Order</label>
                <input type="number" value={uploadSort} onChange={e => setUploadSort(parseInt(e.target.value))} className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-900">Cancel</button>
                <button type="submit" disabled={isUploading || !uploadFile} className="bg-[#DF3B4D] hover:bg-[#C93545] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2">
                  {isUploading ? (
                    <><div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div> Uploading...</>
                  ) : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-900">Edit Media Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 bg-white flex items-center gap-4 border-b border-gray-200">
              <img src={editingItem.url} className="w-20 h-20 object-cover rounded-lg" alt="" />
              <div>
                <p className="text-gray-900 font-bold font-bold text-xs uppercase">{editingItem.section}</p>
                <p className="text-gray-500 text-xs mt-1">Device: {editingItem.device}</p>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Slot Name</label>
                <input type="text" value={editSlot} onChange={e => setEditSlot(e.target.value)} required className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-500 block">Alt Text</label>
                <input type="text" value={editAlt} onChange={e => setEditAlt(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-500 block">Sort Order</label>
                  <input type="number" value={editSort} onChange={e => setEditSort(parseInt(e.target.value))} className="w-full bg-white border border-gray-200 text-gray-900 p-2 rounded-lg" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center cursor-pointer gap-2">
                    <input type="checkbox" checked={editActive} onChange={e => setEditActive(e.target.checked)} className="form-checkbox bg-white border-gray-200 text-gray-900 font-bold rounded focus:ring-0" />
                    <span className="text-sm text-gray-900">Active</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-900">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-[#DF3B4D] hover:bg-[#C93545] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-[#DF3B4D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#DF3B4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Delete Media?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this file? This action cannot be undone and it will disappear from your website.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setItemToDelete(null)} 
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-[#DF3B4D] hover:bg-[#C93545] text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function MediaManagerPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-[#DF3B4D] border-t-transparent rounded-full animate-spin"></div></div>}>
      <MediaManagerInner />
    </Suspense>
  );
}
