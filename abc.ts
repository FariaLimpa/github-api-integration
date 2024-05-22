{
  // promise

  const getTodo = async () => {
    const response = await fetch("https://annoorserver.qinsyl.com/api/product");
    const data = await response.json();
    // return data;

    console.log(data);
  };

  getTodo();

  const createpromise = () => {
    return new Promise<string>((resolve, reject) => {
      const data: string = "something";
      if (data) {
        resolve(data);
      } else {
        reject("failed to load data");
      }
    });
  };

  // calling create promise function
  const showData = async () => {
    const data = await createpromise();
    console.log(data);
  };
}
