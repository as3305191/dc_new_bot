# 使用官方 Node.js LTS 映像
FROM node:18-alpine

# 建立工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci

# 複製專案檔案
COPY . .

# 設定啟動指令
CMD ["npm", "start"]
