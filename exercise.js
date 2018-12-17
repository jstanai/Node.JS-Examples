
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function getCustomerFull(id) {
    try{
        const customer = await getCustomer(id);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            const dogs = await sendEmail(customer.email, movies);
        }
    }
    catch (err) {
        console.log(new Error(err.message));
    }
}

getCustomerFull(1);



function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ 
          id: id, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 1000);
  });
     
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 1200);
    });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Email sent...')
        resolve('yes')
    }, 1500);
  });
}