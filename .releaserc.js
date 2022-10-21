const ref = process.env.GITHUB_REF;
const branch = ref.split('/').pop();

module.exports = {
  branches: [
    'master',
    'next',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'dev',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `CHANGELOG_${branch}_.md`,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
        ],
        message: '${nextRelease.version} CHANGELOG [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
}
