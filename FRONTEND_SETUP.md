# Kết nối React Vite với Backend

## 1. Ở Frontend (React Vite):

### Cách 1: Dùng Proxy (Khuyến nghị cho dev)

Trong file `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

Gọi API từ React:
```typescript
// Không cần ghi localhost:3000 vì đã proxy
fetch('/api/hello')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Cách 2: Gọi trực tiếp (cho production)

Tạo file `.env` trong React project:
```
VITE_API_URL=http://localhost:3000
```

Gọi API:
```typescript
fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data));
```

## 2. Ở Backend (Node.js - đã config):

✅ Đã cài CORS
✅ Đã thêm middleware để parse JSON
✅ API endpoint: `http://localhost:3000/api/hello`

## 3. Chạy cả 2 server:

```bash
# Terminal 1 - Backend
cd learnnode
npm run dev

# Terminal 2 - Frontend
cd your-react-app
npm run dev
```
