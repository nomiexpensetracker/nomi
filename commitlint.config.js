module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
        "build",
        "ops",
        "docs",
        "chore",
        "merge",
        "revert",
        "revamp",
      ],
    ],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-case": [2, "always", "lower-case"],
  },
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};
