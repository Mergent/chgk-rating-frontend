// import { fakeLocation } from "./location";
// import { fakeOrders } from "./orders/orders";
// import { fakeRoles } from "./roles/roles";
// import { fakeSync } from "./sync";
import { delay } from "./utils";
// import { fakeDrupalUsers } from "./drupalUsers/users";
import { fakeLogin } from './login';
import { fakeUsers } from "./users";
import { fakeRoles } from "./roles";
// import { fakeJobs } from "./jobs/jobs";

const fakeApi = async (url: string, config: any) => {
  const settings = JSON.parse(localStorage.getItem('devVB') ?? "{}");

  const delayTime = parseInt(settings?.delay ?? '1000', 10)
  await delay(delayTime)

  if (url.includes('oauth/token')) {
    console.log('uspeh')
    return fakeLogin(url, config)
  }

  if (settings?.errorRequest ?? false) {
    throw new Error('Error error')
  }

  // if (url.startsWith('http://127.0.0.1:8085/bufservice/jobs')) {
  //   return fakeJobs(url, config)
  // }
  if (url.includes('userservice/db/user')) {
    return fakeUsers(url, config)
  }
  if (url.includes('roleservice/db/role')) {
    return fakeRoles(url, config)
  }
  // if (url.startsWith('http://127.0.0.1:8087/syncservice/drupal/users')) {
  //   return fakeDrupalUsers(url, config)
  // }
  // if (url.startsWith('http://127.0.0.1:8090/userservice/db/role')) {
  //   return fakeRoles(url, config)
  // }
  // if (url.startsWith('http://127.0.0.1:8091/orderservice')) {
  //   return fakeOrders(url, config)
  // }
  // if (url.startsWith('http://127.0.0.1:8087/syncservice')) {
  //   if (url.startsWith('http://127.0.0.1:8087/syncservice/location')) {
  //     return fakeLocation(url, config)
  //   }
  //   return fakeSync(url, config)
  // }
}

export default fakeApi
