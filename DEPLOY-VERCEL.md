# FeeSide 部署预备包（Vercel + feeside.com）— 中文逐步指南

> 生成：2026-10-27 晨间加速会话。**部署本身 = 三档动作（首次生产部署），执行前需在 decisions.md 批准。**
> 本包是"批准后 30 分钟内上完线"的全部弹药：两条部署路线 + DNS 配置值 + 上线后清单。
> 站点技术形态：Next.js 静态导出（`output: 'export'`），产物 `out/`，无环境变量依赖（SITE.url 已硬编码 https://feeside.com）。

## 前置状态（截至 2026-10-28 晨）

- [x] 仓库构建通过（13 页 + /sheet 全静态导出）
- [x] 域名 feeside.com 已注册（阿里云，hold 已解除）
- [x] GitHub 仓库已推送：https://github.com/wssylhy/feeside-com （PAT 已配）
- [ ] config 数字 [核]（for-human 第 4 项）→ 我合入后重导出
- [ ] Cloudflare 接管 NS（for-human 第 2 项）——可与部署并行做
- [ ] Vercel 账号（DD2 第②项，GitHub 登录）
- [ ] 首次生产部署批准（三档，decisions.md 一行）

## 路线 T（推荐，你的人工最少）：你注册 + 贴 token，我部署

1. 你：https://vercel.com → **Sign Up with GitHub**（用 GitHub 账号直接登录，1 分钟）
2. 你：右上角头像 → **Account Settings → Tokens → Create Token**（名字随便填，scope=Full Account）→ 把 token 字符串发我（用完可随时在面板撤销）
3. 我：`npx vercel --token <TOKEN> --prod --cwd C:\hyls\p1-feesite` 完成部署 → 拿到 feeside-com.vercel.app → 再执行域名绑定所需的其余 CLI 步骤
4. 你：Cloudflare NS 接管（下节）→ 我把域名绑定 + 验证收尾
> token 是临时凭据：部署完成后你可在面板一键删除，不留风险。

## 路线 A：GitHub → Vercel 面板导入（此后每次 push 自动上线）

1. vercel.com → **Add New… → Project** → Import `feeside-com`
2. Framework Preset 自动识别 **Next.js**（其他字段全默认）→ **Deploy** → 1-2 分钟拿到 `feeside-com.vercel.app`
3. 绑定域名：Project → **Settings → Domains** → 添加 `feeside.com` 和 `www.feeside.com`
4. Vercel 提示的记录在 Cloudflare DNS 里添加（值以 Vercel 面板显示为准，通常是下表）：

| 类型 | 名称 | 值 |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

5. 回 Cloudflare：**暂关橙色云**（DNS only 灰云）让证书签发，Vercel 面板域名变绿后再考虑开云（开云=CDN 代理，与 Vercel 自带 CDN 重复，建议保持灰云）
6. 强制 HTTPS：Vercel 自动签发证书，无需手动
> 路线 A 完成后建议后续更新都走它（push 即上线）；路线 T 适合今天抢时间首发。

## DNS 前置：Cloudflare 接管（for-human 第 2 项，5 分钟）

1. Cloudflare → Add domain `feeside.com` → Free 套餐 → 得到 2 个 NS 地址
2. 阿里云控制台 → 域名 → 修改 DNS 服务器 → 替换为 Cloudflare 的 2 个 NS → 生效最长 24h（通常 10 分钟）
3. Cloudflare DNS 页：把阿里云原有记录全删，添加上表 2 条（A/@、CNAME/www，灰云）
4. Cloudflare Email Routing：目标地址填你的 Gmail 验证 → 规则 `admin@feeside.com` → 转发 Gmail → 启用

## 上线后清单（10 分钟，逐项打勾）

- [ ] https://feeside.com 打开正常（6 计算器 + /compare + /privacy）
- [ ] https://feeside.com/sitemap.xml 与 /robots.txt 正常
- [ ] Google Search Console：添加资源（域验证走 Cloudflare DNS TXT 记录，Cloudflare 一键）→ 提交 sitemap
- [ ] Bing Webmaster Tools：从 GSC 导入一键完成（国际版流量也走 Bing）
- [ ] admin@feeside.com 收发测试
- [ ] privacy 页并入扩展隐私段落（CWS 提审依赖，见 p1-extension\store\LISTING.md §3）
- [ ] state.md 记账 + decisions.md 部署项销账

## 与部署相关的遗留依赖

| 依赖 | 阻塞谁 | 状态 |
|---|---|---|
| GitHub PAT（DD2） | 路线 A 第 1 步 | 等账号授权 |
| Cloudflare NS（for-human 2） | DNS 生效 | 待用户操作 |
| 首次生产部署批准（三档） | 一切 | 部署前在 decisions.md 立项 |
