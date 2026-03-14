# Bizarre Lineage Trello Gap Roadmap

日期：2026-03-15

本文档用于记录“对照官方 Trello 后，本站还需要补哪些内容”的执行状态。它不是纯 brainstorming，而是后续内容扩张的实际待办基线。

## 1. 背景

在对照官方 Trello 与站内现有内容后，我们最初确认了 5 个高价值缺口：

1. `NPC / Regions` 数据库页
2. `Items` 页面或 hub
3. `Accessories / Skins` 页面或 hub
4. `Regions / Map / Bus Stops` 导航页
5. `Boss / Enemy / Drop` 数据页

判断依据：

- 这些主题在官方 Trello 的公开结构中占比不低。
- 这些主题对应明显的搜索意图，比如：
  - `bizarre lineage npc locations`
  - `where to find pucci in bizarre lineage`
  - `bizarre lineage map`
  - `bizarre lineage items`
  - `bizarre lineage accessories`
  - `bizarre lineage boss drops`
- 这些主题能补齐本站当前“有 codes / stands / guides / terms，但缺数据库型内容”的结构问题。

## 2. 已完成

### 2.1 NPC / Regions 第一阶段

已经完成第一个 Trello gap 模块：`NPC / Regions` 基础 hub。

已落地内容：

- 新页面：`/npc-locations`
- 新内容数据：
  - `src/content-data/npc-locations.ts`
- 新页面渲染组件：
  - `src/features/wiki/npc-locations-content.tsx`
- 新页面 MDX：
  - `content/pages/npc-locations.mdx`
- 新页面 metadata locale messages：
  - `src/config/locale/messages/en/pages/npc-locations.json`
  - `src/config/locale/messages/es/pages/npc-locations.json`
- sitemap 已补录：
  - `/npc-locations`
  - `/es/npc-locations`

这个页面当前已覆盖：

- 核心 NPC：
  - Arch Mage
  - Pucci
  - Ancient Ghost
  - Rudol von Stroheim
  - Elder Vampire
  - Boxing Coach
  - Samurai Master
  - Karate Sensei
- 核心 map anchors / regions：
  - Gym
  - Hospital
  - Kame Yu Market
  - Cultist Castle
  - Graveyard
  - Morioh Station
- 核心 bus stop routing：
  - Bus stop 3
  - Bus stop 10
  - Bus stop 13
  - Bus stop 18

这个阶段的定位是：

- 先做搜索意图最强的入口页
- 先把 Trello 里已经确认过的 NPC / region / bus stop 信息集中化
- 对仍然是占位的路线显式标注，而不是猜测补全

### 2.2 全站导航同步

为了让这个模块拿到更好的全站内链支持，导航也已经同步调整：

- header 新增 `NPC Locations`
- footer 已纳入当前更适合内容站的内部链接结构

说明：

- footer 后续按用户要求恢复了 `Friends` 外链栏。
- 隐私协议和用户协议已回到 footer 最底部与 copyright 同排显示。

## 3. 进行中但尚未完全覆盖的部分

虽然 `NPC / Regions` 第一阶段已经完成，但这一块还没有做到“完整数据库”。

当前缺口：

1. 还没有单独的 `Regions` hub
   - 现在 region 内容主要是 NPC hub 内的 map anchor 级摘要
   - 还没有把区域做成独立的 browse 页面

2. 还没有单独的 `Bus Stops` 数据页
   - 当前是路线型摘要，不是完整 bus stop index

3. 还没有拆出单 NPC detail 页
   - 现在是 hub 内卡片
   - 还没有做到 `/npc-locations/pucci` 这种 detail 级路由

结论：

- `NPC / Regions` 已经完成第一阶段
- 但还没有进入“数据库深挖阶段”

## 4. 仍待完成的核心模块

### 4.1 Items Hub

优先级：高

目标：

- 建立一个面向搜索和导航的 `Items` 页面
- 收纳当前已经散落在站内各处的关键物品路线

建议覆盖对象：

- Stand Arrow
- Lucky Arrow
- Vampire Mask
- 其他已在 raid / progression / Trello 中反复出现的关键物品

建议页面职责：

- 解释物品做什么
- 物品常见获取路径
- 物品最相关的系统页链接
- 哪些物品适合做单独 detail 页

建议路由：

- `/items`

建议后续数据文件：

- `src/content-data/items.ts`

### 4.2 Accessories / Skins Hub

优先级：高

目标：

- 补齐当前中后期玩家更在意、但本站几乎没有覆盖的一层内容

建议覆盖对象：

- raid-exclusive accessories
- 站内已经在 raid 页面出现过的饰品名
- Trello 或其他已确认来源中反复出现的 skins / cosmetics

建议页面职责：

- 哪些饰品来自哪些 raid 或 route
- 哪些外观类内容值得单独追
- 哪些词更适合做聚合页而不是单页

建议路由：

- `/accessories`
- 后续如有必要再扩展 `/skins`

建议后续数据文件：

- `src/content-data/accessories.ts`
- 如需要再补 `src/content-data/skins.ts`

### 4.3 Regions / Map / Bus Stops Hub

优先级：中高

目标：

- 把“地图导览意图”从当前的 NPC 页里单独拆出来

建议覆盖对象：

- Gym
- Graveyard
- Cultist Castle
- Hospital
- Kame Yu Market
- Morioh Station
- bus stop 关键路由

建议页面职责：

- 用区域来组织内容，而不是用系统词条来组织
- 支持 `bizarre lineage map` / `bizarre lineage regions` / `bizarre lineage bus stop locations`

建议路由：

- `/map`
- 或 `/regions`

建议后续数据文件：

- `src/content-data/regions.ts`

说明：

- 这个模块与当前 `/npc-locations` 有明显重叠
- 更合理的做法是把它做成第二阶段拆分，而不是立刻推翻 NPC 页面

### 4.4 Boss / Enemy / Drop Hub

优先级：中高

目标：

- 补齐“打什么、掉什么、值不值得 farm”的数据库层

建议覆盖对象：

- world boss
- raid boss
- 特定敌人 / waves / 掉落路线

建议页面职责：

- Boss 是谁
- 出现在哪
- 主要掉落什么
- 更适合谁 farm
- 对应的 raid / event / progression 链接

建议路由：

- `/bosses`

建议后续数据文件：

- `src/content-data/bosses.ts`

## 5. 推荐推进顺序

按当前收益和复用性，推荐顺序如下：

1. `Items Hub`
2. `Accessories / Skins Hub`
3. `Regions / Map / Bus Stops Hub`
4. `Boss / Enemy / Drop Hub`
5. `NPC / Regions` 第二阶段深挖

原因：

- `Items` 最容易复用现有站内信息，也最容易给多页面补内链。
- `Accessories / Skins` 能明显补齐当前站点面向中后期玩家的内容面。
- `Regions / Map` 更适合在已有 NPC hub 的基础上拆第二层。
- `Boss / Drop` 适合等前面数据库骨架更清晰后再系统化展开。

## 6. 每个模块的最低完成标准

后续每个新模块，最低都应满足：

1. 有独立 hub 页
2. 有本地结构化数据文件
3. 有首页、header、footer 或相关页的内部链接入口
4. 有 sitemap 收录
5. 有 locale metadata message
6. 做一次 SEO 检查，至少覆盖：
   - 主关键词
   - 2 到 4 个长尾词
   - title / description / H2 / FAQ

## 7. 当前结论

截至 2026-03-15：

- 第一阶段已完成：`NPC / Regions` hub
- 下一优先模块：`Items`
- 当前最合理的执行方式不是再做泛页面，而是继续沿着“hub + structured data + clear internal linking”的数据库路线推进

