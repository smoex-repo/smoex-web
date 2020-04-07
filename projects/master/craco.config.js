const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var path = require("path");
var fs = require("fs");
 
var packagesPath = path.join(__dirname, '../../packages')
function syncGetDirections(pathName) {
    const dirs = [];
    const files = fs.readdirSync(pathName)
    for (const file of files) {
        const data = fs.statSync(path.join(pathName, file))
        if (data.isDirectory()) {
            dirs.push(`${pathName}/${file}`)
        }
    }
    return dirs
}

const includeRegexp = /\.(js|mjs|jsx|ts|tsx)$/

const packagePaths = syncGetDirections(packagesPath).map(file => file + '/src')

function replaceIncludePath(rule) {
  // 由于和 ts 语法冲突，暂时忽略 eslint 对 packages 的检测
  if (rule.enforce === 'pre') {
    return
  }
  if (String(rule.test) === String(includeRegexp)) {
    rule.include = [
      rule.include,
      ...packagePaths,
    ]
  }
}

module.exports = {
  webpack: {
    plugins: [process.env.ANALYZE && new BundleAnalyzerPlugin()].filter(Boolean),
    configure: (webpackConfig, { env, paths }) => {
      for (const rule of webpackConfig.module.rules) {
        replaceIncludePath(rule)
        if (rule.oneOf && rule.oneOf.length) {
          for (const oneOfRule of rule.oneOf) {
            replaceIncludePath(oneOfRule)
          }
        }
      }
      return webpackConfig; 
    }
  },
  typescript: {
    watch: packagePaths,
  },
}
