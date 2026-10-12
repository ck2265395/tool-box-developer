#!/usr/bin/env bash
# 东土百宝箱 - 一键同步（提交 + 推送 + 修复远端跟踪 ref）
#
# 用法： bash scripts/git-sync.sh "可选的提交信息"
# 行为： 无改动 -> 静默退出；有改动 -> add + commit + push
set -u

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || exit 1

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
MSG="${1:-}"
if [ -z "$MSG" ]; then
  MSG="chore: auto sync $(date '+%Y-%m-%d %H:%M')"
fi

# ---------------------------------------------------------------------------
# 本机环境下 git 无法写入 refs/remotes/**（git fetch / update-ref 的写入会被
# 静默丢弃，导致 origin/<branch> 停留在旧值、git status 误报 ahead/behind）。
# 因此这里绕过 git，直接写文件来维护远端跟踪 ref。
# ---------------------------------------------------------------------------
repair_remote_ref() {
  local sha
  sha="$(git ls-remote origin "refs/heads/$BRANCH" 2>/dev/null | cut -f1)"
  if [ -n "$sha" ]; then
    mkdir -p ".git/refs/remotes/origin"
    printf '%s\n' "$sha" > ".git/refs/remotes/origin/$BRANCH"
  fi
}

repair_remote_ref

# 有改动才动
if [ -z "$(git status --porcelain)" ]; then
  echo "[git-sync] 没有改动，跳过。"
  exit 0
fi

echo "[git-sync] 变更清单："
git status --short

git add -A || { echo "[git-sync] git add 失败"; exit 1; }

if git diff --cached --quiet; then
  echo "[git-sync] 暂存区为空，跳过提交。"
  exit 0
fi

git commit -q -m "$MSG" || { echo "[git-sync] commit 失败"; exit 1; }
echo "[git-sync] 已提交：$(git log --oneline -1)"

echo "[git-sync] 推送到 origin/$BRANCH ..."
if git push origin "$BRANCH"; then
  repair_remote_ref
  echo "[git-sync] 推送成功 ✅"
else
  echo "[git-sync] 推送失败 ❌"
  echo "           若被拒绝（远端有新提交），先执行："
  echo "           git pull --rebase origin $BRANCH"
  exit 1
fi
