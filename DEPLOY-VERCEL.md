# FeeSide 部署预备包（Vercel + feeside.com）— 中文逐步指南

> 生成：2026-10-27 晨间加速会话。**部署本身 = 三档动作（首次生产部署），执行前需在 decisions.md 批准。**
> 本包是"批准后 30 分钟内上完线"的全部弹药：两条部署路线 + DNS 配置值 + 上线后清单。
> 站点技术形态：Next.js 静态导出（`output: 'export'`），产物 `out/`，无环境变量依赖（SITE.url 已硬编码 https://feeside.com）。

## 前置状态（截至 2026-10-27）

- [x] 仓库构建通过（13 页全静态导出，`.zcode\reports\` 有验收记录）
- [x] 域名 feeside.com 已注册（阿里云，hold 已解除）
- [ ] Cloudflare 接管 NS（for-human 第 2 项，待做）——**推荐先做这步**，DNS 和邮箱转发一次配齐
- [ ] GitHub 仓库推送（等 DD2 GitHub 授权 + PAT）
- [ ] Vercel 账号（DD2 第②项，GitHub 登录）

## 路线 A：GitHub → Vercel（推荐，此后每次 push 自动上线）

1. 仓库推送（需 GitHub PAT，DD2 授权后我代跑）：`p1-feesite` 推为 GitHub 公开仓库 `feeside-com`（静态站无敏感信息；如想私有也行，Vercel Hobby 支持私有仓库，数量有限制）
2. vercel.com → **Add New… → Project** → Import `feeside-com`
3. Framework Preset 会自动识别 **Next.js**（其他字段全默认）→ **Deploy** → 1-2 分钟拿到 `feeside-com.vercel.app`
4. 验证：打开预览域 → 首页/6 计算器页/compare 页全 200；`/sitemap.xml`、`/robots.txt` 可访问
5. 绑定域名：Project → **Settings → Domains** → 添加 `feeside.com` 和 `www.feeside.com`（Vercel 会提示需要的 DNS 记录，见下节）
6. Vercel 提示的记录在 Cloudflare DNS 里添加（值以 Vercel 面板显示为准，通常是下表）：

| 类型 | 名称 | 值 |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

7. 回 Cloudflare：**暂关橙色云**（DNS only 灰云）让证书签发，Vercel 面板域名变绿后再考虑开云（开云=CDN 代理，与 Vercel 自带 CDN 重复，建议保持灰云）
8. 强制 HTTPS：Vercel 自动签发证书，无需手动

## 路线 B：Vercel CLI 直推（不想等 GitHub 授权时的快速路）

```bash
npm i -g vercel
cd C:\hyls\p1-feesite
vercel login        # 邮箱验证码登录
vercel --prod       # 首次会问: link to existing? No → 项目名 feeside-com
```
- CLI 路线绕过 GitHub，但失去"push 自动部署"。推荐仍走路线 A；CLI 仅作应急。

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
