function promiseTest(x) {
   return new Promise((resolve, reject) => {
      if(x === 0)
      {
         resolve("It Worked!")
      }
      if (x === 1)
      {
         reject(new Error("It Failed"))
      }
   })
}



async function test()
{
   try
   {
      await promiseTest(1).then(
         console.log("Hello")
      )
   }
   catch(err)
   {
      console.log(err)
   }
}



test()