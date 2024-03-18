export const addDine = async ({name, price, description, image}) => {
    console.log(name, price, description, image);
    const response = await fetch(
      "http://localhost:5000/api/cities",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          name,
          price,
          description,
          image
        })
      }
    );
    return await response.json();
};