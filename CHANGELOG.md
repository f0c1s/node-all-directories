# Changelog

## Version 7

- Cleanup
- node-all-directories update
- dev dependencies for easier working

## Version 3

- Fix walk() bug: if value of `depth` param was 0, that resulted in an infinite loop.
- Directory object saves depth of the walk now.
- Depth is decreased just before if check
- If Depth is lower than what was calculated earlier, the object is returned immediately.

## Version 2

- Errors while reading direcotries are saved with objects instead of printing to stdout via console.
- .walk() is now redefined to accept depth paramter. .walk(3) means that the directories will be filled upto depth 3.
  default is 1.
- .walk is redfined to return object instead of children

## Version 1

Basic functionality
