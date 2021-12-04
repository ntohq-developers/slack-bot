function splitArgs(args, splitBy="")
{
   return args.split(splitBy)
}

function hasMultipleArgs(args)
{
   return (args.length > 1 && typeof(args) == 'object')
}


