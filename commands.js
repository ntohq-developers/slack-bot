function SplitArgs(args, splitBy = " ")
{
   return args.split(splitBy)
}

function FlagToChar(flag)
{
   // find the flag's first character after the dash
   flagCharLocation = flag.search('-') + 1

   // Get and Return the flag's character in lower case form
   return flag.slice(flagCharLocation, flagCharLocation + 1).toLowerCase()
}

function HasMultipleArgs(args, minCountOfArgs=3)
{
   return (args.length > minCountOfArgs && typeof (args) == 'object')
}

module.exports = { 
   SplitArgs, 
   FlagToChar,
   HasMultipleArgs

};