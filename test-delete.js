const jwt = require('jose');

async function getAdminCookie() {
  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'kcb-jwt-secret-a9f3b2d1e8c7');
  const alg = 'HS256';
  const token = await new jwt.SignJWT({ username: 'admin', role: 'admin' })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  return token;
}

async function testDelete() {
  const token = await getAdminCookie();
  
  // First GET media to find an ID to delete
  const res = await fetch('https://kingchinesebowl.kingchinesebowl.workers.dev/api/media');
  const items = await res.json();
  
  const idToDelete = items.find(item => !item.r2_key.startsWith('media/hero/desktop/1791'))?.id || items[0]?.id;
  if (!idToDelete) {
      console.log('No items to delete');
      return;
  }
  
  console.log('Attempting to delete ID:', idToDelete);
  
  const delRes = await fetch(`https://kingchinesebowl.kingchinesebowl.workers.dev/api/media/${idToDelete}`, {
    method: 'DELETE',
    headers: {
      'Cookie': `admin_session=${token}`
    }
  });
  
  console.log('Status:', delRes.status);
  console.log('Response:', await delRes.text());
}

testDelete();
