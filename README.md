# Open-ClaudeCode

> 完整开源的 Claude Code 项目 - 基于 Anthropic 官方源码重建

🌐 **Languages**: [中文](README.md) | [English](README.en.md)

---

## 🙏 特别感谢

**本项目由衷感谢 Anthropic 公司的开源贡献！**

Anthropic 通过 npm 包发布 Claude Code，使我们能够学习和研究这个优秀的 AI 编程助手架构。本项目的源码是从官方 npm 包的 source map 中恢复的，仅供学习和研究使用。

> "您说的对，我不应该把map文件一并发布到npm中，这是一个非常严重的错误。"

我们理解 source map 文件本应用于开发调试，而非公开发布。Anthropic 对此问题的认识和处理方式值得我们学习。

---

## 📖 项目简介

Open-ClaudeCode 是一个完整的 Claude Code 开源版本，包含：

- ✅ **可运行的 CLI** - 编译后的完整可执行文件 (v2.1.88)
- ✅ **TypeScript 源码** - 1,902 个恢复的源文件供学习研究
- ✅ **官方插件** - 13 个 Anthropic 官方插件
- ✅ **配置示例** - 多种场景的 settings 配置
- ✅ **完整文档** - 项目说明、使用指南、CHANGELOG

---

## 📁 目录结构

```
Open-ClaudeCode/
├── package/              # 可运行的 CLI
│   ├── cli.js            # 编译后的 CLI (12.5MB)
│   ├── cli.js.map        # Source Map (57MB)
│   ├── package.json      # 包配置
│   ├── bun.lock          # Bun 锁文件
│   ├── sdk-tools.d.ts    # SDK 类型定义 (117KB)
│   └── vendor/           # 原生二进制模块
│       ├── audio-capture/   # 音频捕获 (6 平台)
│       └── ripgrep/         # 代码搜索工具 (6 平台)
├── src/                  # 完整 TypeScript 源码 (1,902 文件)
│   ├── tools/            # 30+ 工具实现 (184 文件)
│   ├── commands/         # 50+ 命令实现 (207 文件)
│   ├── services/         # API、MCP、OAuth 服务 (130 文件)
│   ├── components/       # React UI 组件 (389 文件)
│   ├── ink/              # Ink UI 框架 (96 文件)
│   ├── utils/            # 工具函数 (564 文件)
│   ├── hooks/            # React Hooks (104 文件)
│   ├── bridge/           # 桥接模块 (31 文件)
│   ├── vendor/           # 原生模块源码 (4 文件)
│   └── ...               # 更多模块
├── plugins/              # 13 个官方插件
│   ├── agent-sdk-dev/
│   ├── claude-opus-4-5-migration/
│   ├── code-review/
│   ├── commit-commands/
│   ├── explanatory-output-style/
│   ├── feature-dev/
│   ├── frontend-design/
│   ├── hookify/
│   ├── learning-output-style/
│   ├── plugin-dev/
│   ├── pr-review-toolkit/
│   ├── ralph-wiggum/
│   └── security-guidance/
├── examples/             # 配置示例
│   └── settings/         # strict / lax / bash-sandbox
├── docs/                 # 文档
├── README.md             # 本文件
├── ACKNOWLEDGEMENTS.md   # 感谢声明
├── CHANGELOG.md          # 版本更新记录
├── LICENSE               # 许可证说明
├── .gitignore            # Git 忽略规则
└── .gitattributes        # Git 属性
```

---

## 🚀 快速开始

### 前置要求

- **Node.js 18+** ([下载](https://nodejs.org/))
- **API 密钥**（任选一种）：
  - 🔵 **Anthropic 官方 API** — 在 [console.anthropic.com](https://console.anthropic.com/) 注册获取 API Key
  - 🟢 **第三方代理** — 国内用户推荐，获取代理地址和 API Key
  - 🔴 **Claude 订阅账号** — 运行后通过 OAuth 登录（需科学上网）

### 第一步：克隆并运行

```bash
# 1. 克隆仓库
git clone https://github.com/LING71671/Open-ClaudeCode.git
cd Open-ClaudeCode

# 2. 验证环境
node --version          # 需要 >= 18.0.0
node package/cli.js --version  # 应显示 2.1.88

# 3. 启动！
node package/cli.js
```

### 第二步：认证

首次运行需要认证，选择以下**任一方式**：

#### 方式一：第三方代理（国内推荐 🇨🇳）

适合中国大陆用户，无需科学上网：

1. 获取第三方代理的 API 地址和密钥
2. 创建 `settings.json`：
```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://你的代理地址",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的密钥"
  }
}
```
3. 运行：`node package/cli.js --settings settings.json`

#### 方式二：Anthropic 官方 API

1. 访问 [console.anthropic.com](https://console.anthropic.com/) 注册账号
2. 获取 API Key（格式 `sk-ant-...`）
3. 创建 `settings.json`：
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-ant-你的密钥"
  }
}
```
4. 运行：`node package/cli.js --settings settings.json`

#### 方式三：Claude 订阅账号（OAuth）

需要 Claude 订阅 + 科学上网：

```bash
# 直接运行，会自动打开浏览器登录
node package/cli.js
```

---

## 🖥️ 运行截图

![Open-ClaudeCode 运行截图](./test.png)

---

## 📖 使用教程

### 模式一：交互模式（推荐新手）

直接运行，像聊天一样对话：

```bash
node package/cli.js
```

进入后你会看到交互界面，可以直接输入问题或指令：

```
> 帮我创建一个 Python Flask 项目
> 解释一下这段代码
> 帮我修复这个 bug
```

**常用操作：**
- 输入文字 → 按 Enter 发送
- `Ctrl+C` → 中断当前操作
- `/help` → 查看所有可用命令
- `/clear` → 清空对话
- `/exit` → 退出

### 模式二：非交互模式（脚本/管道）

适合自动化、脚本调用：

```bash
# 简单问答
node package/cli.js -p "解释一下什么是闭包"

# 处理文件
node package/cli.js -p "帮我重构 src/main.ts 中的 getUser 函数"

# 指定模型
node package/cli.js -p "写一个排序算法" --model sonnet

# JSON 输出（适合程序处理）
node package/cli.js -p "列出当前目录的文件" --output-format json
```

### 模式三：继续上次对话

```bash
# 继续当前目录的最近对话
node package/cli.js -c

# 恢复指定会话
node package/cli.js -r <session-id>
```

---

## ⚙️ 常用配置

### 🔑 配置自己的 API（第三方代理 / 自定义端点）

如果你使用第三方 API 代理服务或有自定义端点，可以这样配置：

#### 方式一：通过 Settings 文件（推荐，持久化）

1. 创建配置文件：

```json
// settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://你的代理地址",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的API密钥"
  }
}
```

2. 运行时加载配置：

```bash
node package/cli.js --settings settings.json
```

#### 方式二：通过环境变量（临时）

```powershell
# PowerShell
$env:ANTHROPIC_BASE_URL = "https://你的代理地址"
$env:ANTHROPIC_AUTH_TOKEN = "sk-你的API密钥"
node package/cli.js
```

```bash
# CMD
set ANTHROPIC_BASE_URL=https://你的代理地址
set ANTHROPIC_AUTH_TOKEN=sk-你的API密钥
node package/cli.js
```

#### 方式三：通过全局配置目录

Claude Code 会自动读取 `~/.claude/settings.json`：

```json
// C:\Users\你的用户名\.claude\settings.json  (Windows)
// ~/.claude/settings.json  (macOS/Linux)
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://你的代理地址",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的API密钥"
  }
}
```

配置后每次运行 `node package/cli.js` 都会自动使用这些设置。

#### 支持的模型别名

```bash
# 常用模型
node package/cli.js --model sonnet     # Claude Sonnet（默认）
node package/cli.js --model opus       # Claude Opus（最强）
node package/cli.js --model haiku      # Claude Haiku（最快）

# 指定完整模型名
node package/cli.js --model claude-sonnet-4-6
node package/cli.js --model claude-opus-4-6
```

#### ⚠️ 注意事项

- 第三方代理可能不支持所有模型，请以代理方提供的模型列表为准
- `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_API_KEY` 任选其一即可
- 如果同时设置了环境变量和 settings 文件，环境变量优先级更高
- **不要在公开仓库分享包含 API Key 的配置文件**

---

### 选择模型

```bash
# Sonnet（默认，速度快，性价比高）
node package/cli.js --model sonnet

# Opus（最强，但较慢较贵）
node package/cli.js --model opus

# Haiku（最快最便宜）
node package/cli.js --model haiku
```

### 权限模式

```bash
# 默认模式（每次操作需要确认）
node package/cli.js

# 自动接受编辑（不用每次确认文件修改）
node package/cli.js --permission-mode acceptEdits

# 跳过所有权限检查（⚠️ 仅限沙箱环境）
node package/cli.js --dangerously-skip-permissions
```

### 使用插件

```bash
# 从指定目录加载插件
node package/cli.js --plugin-dir ./plugins/code-review

# 加载多个插件
node package/cli.js --plugin-dir ./plugins/code-review --plugin-dir ./plugins/commit-commands
```

---

## 🎯 实战示例

### 示例 1：让 Claude 帮你写代码

```bash
# 进入你的项目目录
cd your-project

# 启动 Claude
node /path/to/Open-ClaudeCode/package/cli.js

# 然后输入：
> 帮我创建一个用户登录 API，使用 Express.js
> 给这个函数添加单元测试
> 修复 src/auth.ts 中的类型错误
```

### 示例 2：代码审查

```bash
# 使用 code-review 插件
node package/cli.js --plugin-dir ./plugins/code-review

# 或者直接让 Claude 审查
> 帮我审查最近的 git diff
> 检查这个 PR 有没有潜在问题
```

### 示例 3：Git 工作流

```bash
# 使用 commit-commands 插件
node package/cli.js --plugin-dir ./plugins/commit-commands

# 或者直接用内置命令
> /commit    # 智能生成 commit message
```

---

## 📋 内置命令速查

在交互模式下输入 `/` 开头的命令：

| 命令 | 功能 |
|------|------|
| `/help` | 显示帮助 |
| `/clear` | 清空对话 |
| `/compact` | 压缩对话历史 |
| `/model` | 切换模型 |
| `/theme` | 切换主题 |
| `/vim` | 切换 Vim 模式 |
| `/cost` | 查看费用统计 |
| `/stats` | 查看使用统计 |
| `/share` | 分享会话 |
| `/exit` | 退出 |

---

## ❓ 常见问题

### Q: 提示需要认证怎么办？
A: 首次运行需要登录。运行后会自动打开浏览器，用你的 Claude 账号登录即可。或者设置 `ANTHROPIC_API_KEY` 环境变量。

### Q: 运行后卡住了？
A: 检查网络连接。如果在中国大陆，可能需要代理：
```bash
$env:HTTPS_PROXY="http://127.0.0.1:7890"
node package/cli.js
```

### Q: 如何查看花了多少钱？
A: 在交互模式下输入 `/cost` 或 `/stats` 查看。

### Q: 如何配置第三方代理或自定义 API？
A: 创建 `settings.json` 文件，内容如下：
```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://你的代理地址",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的密钥"
  }
}
```
然后运行 `node package/cli.js --settings settings.json`。也可以放到 `~/.claude/settings.json` 实现全局配置。

### Q: 可以在任何目录运行吗？
A: 可以！但建议在你的项目目录下运行，这样 Claude 可以访问项目文件。

### Q: 和 npm 安装的区别？
A: 这个仓库提供的是从 npm 包恢复的完整源码，适合学习研究。功能上和 npm 安装的版本一致。

### Q: 支持 OpenAI 格式的 API 吗？
A: Claude Code 原生使用 Anthropic API 格式。如果你需要使用 OpenAI SDK 格式调用，可以使用 **[Universal-AI-Protocol-Bridge](https://github.com/LING71671/Universal-AI-Protocol-Bridge)** 进行协议转换：

**功能特性：**
- 🔄 **协议转换** - 将 OpenAI SDK 格式转换为 Anthropic/Claude API 格式
- 🌐 **多协议支持** - OpenAI、Anthropic、Google Gemini、AWS Bedrock、Azure、Ollama 等
- ⚡ **流式传输优化** - 完整支持 SSE/NDJSON 流式响应
- 🔐 **安全加密** - AES-GCM 加密保护 API Key
- ☁️ **Cloudflare Workers** - 边缘部署，全球低延迟

**使用方法：**
1. 访问 [在线测试地址](https://apibridge.071.cc.cd/) 或自行部署
2. 选择目标协议（如 Anthropic）并填入 API Key
3. 生成代理 URL，将你的 OpenAI SDK `baseURL` 指向该地址即可

```javascript
// 示例：使用 OpenAI SDK 调用 Claude
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://your-bridge-url/proxy/{token}/v1',
  apiKey: 'any-key'  // 实际 Key 已加密在 token 中
});

// 现在可以用 OpenAI 格式调用 Claude 了！
const response = await client.chat.completions.create({
  model: 'claude-3-5-sonnet-latest',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

---

## 📚 学习源码

源码位于 `src/` 目录，包含 1,902 个源文件：

```bash
# 查看入口点
cat src/main.tsx

# 查看工具实现
ls src/tools/

# 查看命令实现
ls src/commands/
```

### 使用插件

插件位于 `plugins/` 目录，包含 13 个官方插件：

```bash
# 查看插件列表
ls plugins/

# 查看插件详情
cat plugins/ralph-wiggum/.claude-plugin/plugin.json
```

---

## 📊 项目统计

| 类别 | 数量 |
|------|------|
| TypeScript 源码 (.ts + .tsx) | 1,884 文件 |
| JavaScript 源码 (.js) | 18 文件 |
| 所有源码文件总计 | 1,902 文件 |
| 工具实现 | 30+ 个 |
| 命令实现 | 50+ 个 |
| 服务模块 | 15+ 个 |
| UI 组件 | 25+ 个 |
| 官方插件 | 13 个 |
| 原生模块 | 2 个 (audio-capture, ripgrep) |
| 支持平台 | 6 个 (macOS/Linux/Windows × arm64/x64) |

---

## 📜 许可证

本项目源码版权归 **Anthropic PBC** 所有。

本仓库仅供学习和研究使用，不代表 Anthropic 官方立场。

详见 [LICENSE](LICENSE) 和 [ACKNOWLEDGEMENTS.md](ACKNOWLEDGEMENTS.md)。

---

## 🔗 相关链接

- [Anthropic 官网](https://www.anthropic.com/)
- [Claude Code 文档](https://code.claude.com/)
- [本项目 GitHub](https://github.com/LING71671/Open-ClaudeCode)
- [讨论区](https://github.com/LING71671/Open-ClaudeCode/issues/2)

---

*最后更新: 2026-04-01*
