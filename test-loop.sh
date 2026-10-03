for i in {1..20}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://kingchinesebowl.kingchinesebowl.workers.dev/api/media")
  echo "Request $i: $STATUS"
  sleep 1
done
