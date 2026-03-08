# Bizarre Lineage Guide Site MVP 实现同步

日期：2026-03-08

本文档不再描述纯规划目标，而是同步当前仓库中的 MVP 实现状态，作为后续迭代基线。

## 1. MVP 完成概况

- 站点已经完成从 ShipAny 模板向公开游戏攻略站的第一阶段转型。
- 当前公开内容层已覆盖首页、兑换码、tier list、stands hub、3 个核心 guides、terms hub 及多篇术语页。
- 站点当前仅支持英文 `en`，未开放中文。
- 内容层以本地静态内容和本地结构化数据为主，没有把数据库作为公开内容渲染依赖。
- 登录、支付、聊天、设置、活动、管理后台等原模板能力已从 MVP 公开范围中移除或硬禁用。

## 2. 路由实现状态

### 已实现

- `/`
- `/codes`
- `/tier-list`
- `/stands`
- `/stands/star-platinum`
- `/guides/beginner-guide`
- `/guides/stats`
- `/guides/prestige`
- `/terms`
- `/terms/raid`
- `/terms/prestige`
- `/terms/awakening`
- `/terms/stand-arrow`
- `/terms/sub-abilities`
- `/terms/fighting-styles`

### 未实现或延期到后续迭代

- `/guides/raids`
- `/guides/awakening`
- `/guides/leveling`
- 除 `/stands/star-platinum` 外的其他 stand detail 页

### 状态结论

- 原 PRD 中的 P0 主干已经基本完成，但 `/guides/raids` 尚未落地。
- 原 PRD 中的部分 P1 已提前完成，尤其是 `/terms` 及其子页面。
- stand 详情页目前仍处于“单样板页验证”阶段，而不是完整数据库覆盖阶段。

## 3. 公开导航现状

当前公开导航已实现为：

- `Codes`
- `Tier List`
- `Stands`
- `Guides`
- `Terms`

当前不暴露：

- `Login`
- `Signup`
- `Pricing`
- `Billing`
- `Chat`
- `Settings`
- `Activity`
- `Admin`

说明：

- `Guides` 以 dropdown 方式暴露 `Beginner Guide`、`Stats Guide`、`Prestige Guide` 和 `Stands Hub`。
- `Terms` 以 dropdown 方式暴露 `Raid`、`Prestige`、`Awakening`、`Stand Arrow`、`Sub-Abilities`、`Fighting Styles`。
- header 中已关闭登录按钮、用户导航、locale 切换入口。

## 4. 页面实现同步

### 首页 `/`

当前实际模块：

- Hero
- What Is Bizarre Lineage
- Quick Access
- Progression Route
- Stand & Meta Preview
- Sources & Verification
- FAQ

实现说明：

- Hero 已包含 `Updated`、`Codes Tracked`、`Top Sample Pick` 以及 `Latest Codes`、`Tier List`、`Beginner Guide` CTA。
- 首页已经明确说明游戏是什么，并把用户导向 codes、tier list、stands、guides、terms。
- 当前实现中 `Sources & Verification` section 被重复渲染了两次，这是已知实现偏差，后续应清理。
- 首页当前没有按旧 PRD 写成纯“玩家视角文案”，仍保留少量站点策略化表达，后续可继续收敛。

### `/codes`

当前实际模块：

- 顶部状态摘要
- 当前验证状态说明
- Active / Archived codes 表格
- Redeem FAQ / 使用说明
- Troubleshooting
- Related links / CTA

实现说明：

- 该页已作为独立自定义 route 落地，不依赖 MDX。
- 当前数据状态是“没有已验证 active codes”，因此页面重点是 verification-first，而不是堆积代码列表。
- 页面已包含 FAQ Schema。
- 页面有 `lastVerified` 和结构化字段，符合 MVP 的 SEO 基础要求。

### `/tier-list`

当前实际模块：

- Interactive stand tier board
- Representative stands
- Methodology
- Role picks
- FAQ

实现说明：

- 页面重点已从静态表格升级为交互式 tier board 加代表 stand 卡片。
- 已落地 methodology，满足“排名页必须解释评价框架”的要求。
- 当前没有单独拆出“Best for PvP/PvE/Beginners”三个大模块，而是以 role picks 汇总呈现。

### `/stands`

当前实际模块：

- Stand cards
- Stand guide overview
- Acquisition
- Best picks
- Site advantage
- What next
- Reading notes
- FAQ
- CTA

实现说明：

- 当前 `/stands` 已经是 stand hub，而不是简单索引页。
- 页面使用 `src/content-data/stands.ts` 驱动多张 stand summary card。
- 当前并未实现旧 PRD 里的真实筛选器和排序器，而是通过卡片、获取方式、推荐块和 FAQ 完成比较任务。
- 页面已回答 “best PvP stand / best PvE stand / how to get stand / stand arrow” 等主搜索意图。

### `/stands/star-platinum`

当前实际模块：

- Hero
- Quick verdict
- How to get
- Abilities
- Strengths vs weaknesses
- Alternatives and related links
- FAQ

实现说明：

- 这是当前唯一已实现的 stand detail 页面。
- 页面承担 stand detail 模板验证作用，后续其他 stand 页面可按同一结构扩展。

### `/guides/beginner-guide`

当前实际模块：

- Hero
- Fast start checklist
- First 30 minutes
- Mistakes to avoid
- Progression path
- FAQ

实现说明：

- 已作为完整长文页落地，并包含 Article / FAQ / HowTo schema。
- 页面结构已经满足 MVP 对新手路径、常见错误和后续阅读引导的要求。

### `/guides/stats`

当前实际模块：

- Hero
- How to think about stats
- What each stat category is trying to do
- Early-game priorities
- PvP vs PvE thinking
- Common mistakes
- Related guides
- FAQ

实现说明：

- 已作为完整长文页落地。
- 页面强调 build logic，而不是脆弱的 patch 数值表。

### `/guides/prestige`

当前实际模块：

- Hero
- What prestige is really for
- When to prestige
- What to prepare before resetting
- Common prestige mistakes
- Related guides
- FAQ

实现说明：

- 已作为完整长文页落地。
- 页面覆盖了“何时 prestige”“准备什么”“常见误区”这三个核心问题。

### `/terms` 与 `/terms/*`

当前实际模块：

- `/terms` 已落地为 glossary hub
- `raid / prestige / awakening / stand-arrow / sub-abilities / fighting-styles` 已有独立 MDX 页面

实现说明：

- 原 PRD 中将术语页列为 P1，但仓库内已完成 Terms hub 和多篇术语页。
- `raid` 术语页不是占位文案，已经包含较完整的 raid reward 与 token shop 内容。

## 5. 内容与数据架构现状

### 已采用的内容层方案

- `content/pages`：承载 terms 及其他静态 page 内容
- `src/content-data/site.ts`：站点级文案、FAQ、官方链接、占位素材
- `src/content-data/codes.ts`：codes 数据
- `src/content-data/tier-list.ts`：tier list 数据与 methodology
- `src/content-data/stands.ts`：stand 数据
- `src/content-data/guides.ts`：guide 页面结构化内容

### 当前架构判断

- 已符合“MDX 放长文、TypeScript 放可复用结构化数据”的建模方向。
- 公开内容层没有依赖数据库查询。
- 当前 route 采用“部分自定义页面 + 部分 MDX 页面”的混合模式，适合 MVP。

## 6. 禁用模块同步

### 路由与页面层

- `sign-in` 页面返回 `notFound()`
- `sign-up` 页面返回 `notFound()`
- `verify-email` 页面返回 `notFound()`
- `pricing` 页面返回 `notFound()`
- `(chat)` layout 返回 `notFound()`
- `(admin)` layout 返回 `notFound()`
- `settings` layout 返回 `notFound()`
- `activity` layout 返回 `notFound()`
- AI generator 页面返回 `notFound()`

### API 层

以下 API 已硬返回 `404`：

- `api/auth/[...all]`
- `api/payment/checkout`
- `api/payment/callback`
- `api/payment/notify/[provider]`
- `api/ai/generate`
- `api/ai/query`
- `api/chat`
- `api/chat/new`
- `api/chat/info`
- `api/chat/list`
- `api/chat/messages`

### 状态结论

- 当前仓库已满足“禁用模块以 404 硬关闭，而不是半连通状态”的实现要求。

## 7. SEO 实现状态

当前已落地：

- 每个核心页面都有独立 metadata
- canonical 基于 `envConfigs.app_url` 生成
- 首页、codes、guides、stands 等核心页已集成 FAQ Schema
- 部分页面已集成 `Article`、`HowTo`、`CollectionPage` 等结构化数据
- 页面普遍具备 `updatedAt` / `lastVerified` 等时间字段
- ISR 已启用，`revalidate = 3600`

当前判断：

- SEO 最低要求整体已达标。
- 首页正文前 100 词内已说明游戏是什么。
- related links 在核心页面中已基本覆盖。

## 8. 当前已知缺口

- `/guides/raids` 尚未实现，和已完成的 `terms/raid` 存在内容层级不平衡。
- `/guides/awakening`、`/guides/leveling` 尚未实现。
- 只有 `Star Platinum` 一个 stand detail 页面，详细覆盖仍不足。
- `/stands` 还没有真正的 filter / sort 交互能力。
- 首页 `Sources & Verification` section 重复渲染一次，需要清理。
- 仓库中仍保留部分 ShipAny 原始代码与数据结构，但目前已不影响公开 guide site MVP。

## 9. 后续迭代建议

- 优先补齐 `/guides/raids`、`/guides/leveling`、`/guides/awakening`
- 以现有 `Star Platinum` 模板批量扩展 stand detail 页
- 为 `/stands` 增加真实筛选与排序
- 清理首页重复 section
- 继续收敛残留的 ShipAny 模板文案与无关代码路径

## 10. 当前 MVP 结论

- MVP 已完成并可作为公开 guide site 的第一版基线。
- 当前版本不是“全量内容站”，而是“主干内容与站点框架已经成立”的可上线形态。
- 后续工作重点应从“是否能上线”转向“内容覆盖扩张、页面质量提升、SEO 深挖和站内结构扩展”。
