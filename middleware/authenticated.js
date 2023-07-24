export default function ({ store, redirect }) {
  // If the user is not authenticated
  console.log('state',store.state.token);
  if (!store.state.token) {
    return redirect('/customer/signin');
  }
}