# Bizarre Lineage 调研总结

日期：2026-03-08

目的：

- 补足对 `Bizarre Lineage` 游戏本体的理解
- 看竞品站到底在怎么组织内容和首页
- 输出对本站首页与 MVP 页面重构有直接指导价值的结论

## 1. 先说结论

我之前对站点视觉的判断没有完全贴合这个品类的真实竞品状态。补完调研后，可以更明确地下结论：

1. `Bizarre Lineage` 不是单纯的“JoJo Roblox 游戏”，而是一个强系统驱动的 Roblox RPG。
2. 玩家搜索意图不只是 `codes / tier list`，还高度集中在：
   - stand 获取与强度
   - sub-abilities / fighting styles 搭配
   - prestige / awakening / raids / leveling
   - stats / build optimization
3. 竞品首页普遍都会先解释“这游戏到底玩什么”，再引导到 codes、tier list、stand guides、builds、raids。
4. 竞品视觉大多不强，但信息架构是对的：
   - 游戏介绍
   - 快速入口
   - stand / build / progression 系统说明
   - FAQ
   - 官方 Roblox / Discord / Trello 跳转
5. 所以我们的首页不能只做“导航页”或“内容入口页”，必须同时承担：
   - 品牌页
   - 游戏介绍页
   - 攻略总览页
   - SEO 主题中心页

## 2. 官方和高可信来源能确认什么

### 2.1 官方 Roblox 页面

官方 Roblox 页面显示该游戏名为 `[QOL 🎉] Bizarre Lineage`，开发者/组织为 `Bizarre Collective`。页面标题和开发者信息可直接确认游戏实体真实存在。  
来源：[Roblox 游戏页](https://www.roblox.com/games/14890802310/Bizarre-Lineage)

### 2.2 游戏基础类型

多家攻略站与媒体均将其描述为受《JoJo's Bizarre Adventure》启发的 Roblox RPG，核心围绕：

- Stands
- Specs / Fighting Styles
- Sub-Abilities
- PvP / PvE
- Raids
- Progression / Prestige / Awakening

这部分虽然不是官方一句话写死，但来自多个独立来源，基本可以视为当前公共认知共识。  
来源：
- [Pro Game Guides: Trello / Discord / Wiki Links](https://progameguides.com/roblox/bizarre-lineage-official-trello-discord-and-wiki-links/)
- [Pro Game Guides: Tier List](https://progameguides.com/roblox/bizarre-lineage-stands-tier-list/)
- [bizarrelineage.wiki 首页](https://www.bizarrelineage.wiki/)

### 2.3 官方信息中心更像 Discord + Trello，而不是官方 Wiki

截至 2026-03-03，`Pro Game Guides` 的整理指出：

- 官方 Discord 存在
- 官方 Trello 已发布
- 仍然没有官方 Wiki

这意味着：

- 玩家当前对“系统性资料”的需求很强
- 但官方没有完整承接
- 这正是第三方攻略站切入的机会

来源：[Pro Game Guides: Official Trello, Discord And Wiki Links](https://progameguides.com/roblox/bizarre-lineage-official-trello-discord-and-wiki-links/)

## 3. 当前能归纳出的游戏系统理解

以下部分主要来自第三方攻略站、工具站和媒体总结，可信度中等到较高，但不应全部当成“官方事实”，更适合用来指导信息架构和页面设计。

### 3.1 核心循环

从多个来源交叉看，`Bizarre Lineage` 的核心循环大致是：

1. 获取或刷 `Stand Arrow`
2. 抽取 / 更换 Stand
3. 搭配 `Fighting Style` 与 `Sub-Ability`
4. 投资 stats
5. 通过 quests / raids / PvP / bosses 推进
6. 进入 `Awakening` / `Prestige` 等中后期成长

来源：
- [Pro Game Guides: Tier List](https://progameguides.com/roblox/bizarre-lineage-stands-tier-list/)
- [bizarrelineage.wiki 首页](https://www.bizarrelineage.wiki/)
- [Droid Gamers: Raids Guide](https://www.droidgamers.com/guides/the-bizarre-lineage-raids-guide/)

### 3.2 玩家关心的不只是 stand 本体，还关心“搭配”

竞品反复强调三个组合层：

- Stand
- Fighting Style
- Sub-Ability

`bizarrelineage.com` 甚至把这个直接做成 `Build Planner`，说明“组合优化”是非常强的用户需求，而不是附属功能。  
来源：
- [bizarrelineage.com 首页](https://www.bizarrelineage.com/)
- [bizarrelineage.com Stats Guide](https://www.bizarrelineage.com/guides/stats)
- [bizarrelineage.wiki 首页](https://www.bizarrelineage.wiki/)

### 3.3 Progression 关键词很重要

目前竞品明显把以下系统当成高价值内容：

- Prestige
- Awakening
- Raids
- Leveling
- Stats
- Arrow / Lucky Arrow farming

这说明本站未来扩张时，不能只停留在 `codes / tier list / stand pages`。  
来源：
- [bizarrelineage.com Prestige Guide](https://www.bizarrelineage.com/guides/prestige)
- [Droid Gamers: Raids Guide](https://www.droidgamers.com/guides/the-bizarre-lineage-raids-guide/)
- [AllThings.how: Arrow Farming](https://allthings.how/the-fastest-way-to-get-stand-arrows-and-lucky-arrows-in-bizarre-lineage/)

### 3.4 Codes 当前不是“量大”型内容，而是“强时效 + 强信任”型内容

多个来源都指向一个现状：

- 当前代码数量很少，甚至一度没有 active codes
- 玩家仍然持续搜索 codes
- 所以这个页面的重要性不在“量”，而在“是否最新、是否可信、是否立刻回答”

来源：
- [Battle of Guardians: March 2026 codes](https://battleofguardians.com/bizarre-lineage-codes-march-2026-none-active/)
- [bizarrelineage.com Codes](https://www.bizarrelineage.com/codes)
- [bizarrelineage.wiki 首页 codes 模块](https://www.bizarrelineage.wiki/)

## 4. 竞品怎么做

## 4.1 `bizarrelineage.wiki`

特点：

- 首页信息密度很高
- 顶部先给一句游戏定义：JoJo-inspired open-world RPG with Stands, builds, and PvP/PvE
- 直接放 Roblox 官方跳转
- 首页不是纯品牌页，而是“资料总控台”
- 包含大量 quick navigation：codes、beginner guide、controls、stats、stands、awakening、sub-abilities、fighting styles、builds、tier list、raids、world events、locations、cosmetics、trading、updates
- 首屏以下立刻开始铺核心内容：codes、beginner guide、controls、stats、tier list、raids、FAQ

它的优点：

- 很懂玩家会搜什么
- 不是只做 3-4 个入口，而是把游戏系统直接暴露在首页
- 专业感来自“系统覆盖面”

它的问题：

- 信息太多，像数据库首页
- 视觉上还是比较普通
- 缺少更强的游戏画面驱动

来源：[bizarrelineage.wiki 首页](https://www.bizarrelineage.wiki/)

## 4.2 `bizarrelineage.com`

特点：

- 明确把自己定位成 `tool + wiki`
- 首页卖点不是“文章很多”，而是：
  - Build Planner
  - Tier List
  - Codes
  - Stand guides
- 它抓住了一个很重要的用户需求：不是只想“读资料”，还想“配 build”
- 站内大量内容围绕评分、组合、对比和优化

它的优点：

- 很像玩家工具站
- 用户价值主张明确
- 比单纯的 blog/SEO 站更有产品感

它的问题：

- 视觉仍然偏工具 / 技术站
- 游戏氛围不够强
- 强依赖抽象数据，情绪和代入感较弱

来源：
- [bizarrelineage.com 首页](https://www.bizarrelineage.com/)
- [bizarrelineage.com Tier List](https://www.bizarrelineage.com/tier-list)
- [bizarrelineage.com Star Platinum](https://www.bizarrelineage.com/stands/star-platinum)

## 4.3 `bizarre-lineage.net`

特点：

- 传统 SEO wiki 风格
- 首页会先介绍游戏、stands、prestige、vampire / hamon、Jotaro raid
- 更明显地把“系统 breadth”当成首页专业度来源

它的优点：

- 首页会讲“游戏本身是什么”
- 游戏系统词覆盖够广

它的问题：

- 视觉比较模板化
- 文案重复关键词痕迹重
- 专业感更多来自“覆盖面”，不是来自“可信的方法论”

来源：[bizarre-lineage.net 首页](https://bizarre-lineage.net/)

## 4.4 `Pro Game Guides`

特点：

- 更像媒体攻略页，不是 wiki 首页
- 内容结构很标准：
  - 更新时间
  - 快速结论
  - tier 分层
  - 目录
  - FAQ
  - 延伸阅读
- 会把 stand 数量、rarity tiers、PvP/PvE、early-game performance 这些玩家核心判断维度写清楚

它的优点：

- 结构稳定
- 扫读效率高
- 非常适合做单篇攻略页模板参考

它的问题：

- 视觉不是品牌资产
- 不会帮我们建立独特首页风格

来源：
- [Pro Game Guides: Tier List](https://progameguides.com/roblox/bizarre-lineage-stands-tier-list/)
- [Pro Game Guides: Official Links](https://progameguides.com/roblox/bizarre-lineage-official-trello-discord-and-wiki-links/)

## 4.5 `Pocket Tactics`

特点：

- 极简媒体型攻略
- 直接给 tier 结果
- 辅助介绍很短

它的优点：

- 快
- 用户知道自己要什么时，进入门槛低

它的缺点：

- 深度不足
- 不适合作为“专业攻略站首页”参考

来源：[Pocket Tactics: Tier List](https://www.pockettactics.com/bizarre-lineage-tier-list)

## 5. 竞品共性和机会点

### 5.1 共性

竞品几乎都在围绕这几个主题建站：

- codes
- tier list
- stands
- sub-abilities / fighting styles
- stats / builds
- raids
- prestige / awakening

### 5.2 明显机会

1. 很多站“词覆盖到了”，但视觉不够像游戏站。
2. 很多站“内容很多”，但首页缺少更强的筛选与分流。
3. 很多站缺少清晰的方法论说明，尤其在 tier list 和 build 建议上。
4. 不少站对“新手第一小时该干嘛”的表达不够强，首页没有很好承接 beginner intent。

## 6. 对我们首页的直接结论

首页必须同时包含以下四层：

### 6.1 第一层：游戏身份

必须在首页上半部分明确回答：

- Bizarre Lineage 是什么
- 它是一款怎样的 Roblox RPG
- 核心玩法围绕什么

否则首页会像“内容导航页”，不像专业攻略站。

### 6.2 第二层：玩家为什么来这个站

必须直接说清楚用户会来解决什么：

- 找 codes
- 看 best stand / tier list
- 走 beginner route
- 判断某个 stand 值不值得刷

### 6.3 第三层：游戏核心系统一览

首页不能只放 4 个 MVP 卡片，还要显式出现这些系统词：

- Stands
- Fighting Styles
- Sub-Abilities
- Raids
- Prestige
- Awakening

即使 MVP 还没全部上线，首页也应该让用户一眼看出这个站“懂系统结构”。

### 6.4 第四层：站点权威感

必须建立“为什么信你”的理由：

- linked to official Roblox / Discord / Trello
- 明确写更新和验证机制
- tier list 要写评估维度
- stand 页要写 quick verdict，不是纯资料搬运

## 7. 对视觉设计的直接结论

这次首页不能再做成“技术编辑部 / 知识文档站”，而应更接近：

- Roblox 攻略站
- Anime combat guide hub
- Fan-made game intelligence desk

### 7.1 该保留的

- 高扫读效率
- 首屏强入口
- FAQ
- 清晰的信息层级

### 7.2 必须更换的

- 纯白大卡 + 文档型留白
- 过于编辑化的命名，如 `Field Notes`
- 纯文字 hero
- 太像技术站的 snapshot 统计块

### 7.3 必须新增的

- 游戏截图 / stand 截图 / raid 截图
- 更强的角色主视觉
- 更像游戏 UI 的模块边框与状态标签
- “游戏介绍 + 核心循环 + 系统结构”模块

## 8. 首页推荐信息架构

调研后，更合理的首页结构应为：

1. Hero
   - 游戏截图 / 角色图
   - 一句定义站点与游戏的主标题
   - 3 个最强入口：Codes / Tier List / Beginner Guide

2. What Is Bizarre Lineage
   - 游戏介绍
   - 简短说明 open-world RPG / stands / PvP-PvE / progression

3. Core Gameplay Loop
   - Arrow -> Stand -> Style/Sub -> Progression -> Raid/PvP

4. Quick Access
   - Codes
   - Tier List
   - Beginner Guide
   - Star Platinum

5. Systems Overview
   - Stands
   - Fighting Styles
   - Sub-Abilities
   - Raids
   - Prestige
   - Awakening

6. Featured Stand
   - Star Platinum
   - Quick verdict + why players care

7. New Player Route
   - 新手三步或四步

8. Why Trust This Wiki
   - 数据来源 / 更新逻辑 / 验证方式

9. FAQ

## 9. 我们要避免的坑

### 9.1 不要只学“首页堆很多词”

很多竞品首页信息量大，但也很容易变成杂乱的 SEO 门户。我们不能只把词和模块都堆上去。

### 9.2 不要把 tier list 写成“拍脑袋榜单”

竞品间的 tier 结论并不完全一致。比如：

- `Pro Game Guides` 把 `Star Platinum` 放到更高梯队
- `Pocket Tactics` 则把 `Star Platinum` 放到 A 档
- 不同第三方站对 `Whitesnake / MIH / The World / Star Platinum` 的相对排序并不完全统一

这意味着我们必须在 tier list 上写清方法论，而不是只给字母。

来源：
- [Pro Game Guides: Tier List](https://progameguides.com/roblox/bizarre-lineage-stands-tier-list/)
- [Pocket Tactics: Tier List](https://www.pockettactics.com/bizarre-lineage-tier-list)
- [bizarre-lineage.com Tier List](https://bizarre-lineage.com/tier-list/)

### 9.3 不要把首页做成纯工具站

`bizarrelineage.com` 的 build planner 思路是对的，但视觉容易偏工具站。我们可以借它的信息组织，但首页仍要保留游戏氛围和角色感。

## 10. 对图片素材的明确需求

接下来设计要像真正游戏攻略站，必须补图。建议最少准备：

1. 首页 hero 战斗截图 1 张
2. Star Platinum 主视觉图 1 张
3. stand / raid / world event 截图 4-6 张
4. 一张带游戏 UI 感的截图
5. 如果能补 trailer 截图或高质量公开视频帧，会更好

优先图片主题：

- Star Platinum 战斗
- The World / Whitesnake / MIH 等高关注 stand
- Raid 场景
- Morioh 场景 / world traversal
- 技能特效明显的 PvP 截图

## 11. 最终设计方向建议

基于这轮调研，本站首页风格建议定为：

`Anime Combat Guide Hub`

关键词：

- game-first
- system-aware
- fast-answer
- stand-centric
- not SaaS
- not pure docs

一句话版本：

首页应该让用户一眼看出“这是一个懂 Bizarre Lineage 系统、能帮我快速做判断的 Roblox 攻略站”，而不是“一个排版很好看的内容站”。

## 12. 参考来源

- [Roblox 游戏页](https://www.roblox.com/games/14890802310/Bizarre-Lineage)
- [Pro Game Guides: Official Trello / Discord / Wiki Links](https://progameguides.com/roblox/bizarre-lineage-official-trello-discord-and-wiki-links/)
- [Pro Game Guides: Tier List](https://progameguides.com/roblox/bizarre-lineage-stands-tier-list/)
- [Pocket Tactics: Tier List](https://www.pockettactics.com/bizarre-lineage-tier-list)
- [bizarrelineage.wiki 首页](https://www.bizarrelineage.wiki/)
- [bizarrelineage.com 首页](https://www.bizarrelineage.com/)
- [bizarrelineage.com Tier List](https://www.bizarrelineage.com/tier-list)
- [bizarrelineage.com Star Platinum](https://www.bizarrelineage.com/stands/star-platinum)
- [bizarrelineage.com Prestige Guide](https://www.bizarrelineage.com/guides/prestige)
- [bizarre-lineage.net 首页](https://bizarre-lineage.net/)
- [Droid Gamers: Raids Guide](https://www.droidgamers.com/guides/the-bizarre-lineage-raids-guide/)
- [Battle of Guardians: Codes](https://battleofguardians.com/bizarre-lineage-codes-march-2026-none-active/)
- [AllThings.how: Arrow Farming](https://allthings.how/the-fastest-way-to-get-stand-arrows-and-lucky-arrows-in-bizarre-lineage/)
- [Reddit: fan-made build planner site](https://www.reddit.com/r/roblox/comments/1riupns/i_built_a_free_build_planner_tier_list_site_for/)
