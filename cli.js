#! /usr/bin/env node

const { program, Option } = require('commander')
const { filterVueFiles, calcTypeScriptRate } = require('./lib')

program
  .argument('<files>')
  .addOption(
    new Option('-f, --format <format>', 'output format')
      .choices(['string', 'json'])
      .default('string')
  )
  .parse()

const options = program.opts()
const files = filterVueFiles(program.args)
const rate = calcTypeScriptRate(files)

if (options.format === 'string') {
  console.log(rate)
} else if (options.format === 'json') {
  console.log(
    JSON.stringify({ rate: rate, percentage: `${Math.round(rate * 100)}%` })
  )
}
