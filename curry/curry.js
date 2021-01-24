const curry = (func) => {
  const curriedFunc = (...args) => {
    return (args.length >= func.length) ? func(...args) :
      (..._args) => curriedFunc(...args, ..._args)
  }
  return curriedFunc;
}
