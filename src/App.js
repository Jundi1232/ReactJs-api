import React, { Component } from 'react'

import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";
import { NavbarComponent } from './component'
import { Home, sukses } from './pages'
export default class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <NavbarComponent></NavbarComponent>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={sukses} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}


// import React, { Component } from 'react'
// import { Col, Container, Row } from 'react-bootstrap';

// import { ListCategories, Hasil, Menu } from './component'

// import { API_URL } from './utils/constants.js'
// import axios from 'axios'
// import swal from 'sweetalert';

// export default class Home extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       menu: [],
//       pilihcategory: 'Makanan',
//       keranjang: []
//     }
//   }
//   componentDidMount() {
//     axios
//       .get(API_URL + "products?category.nama=" + this.state.pilihcategory)
//       .then(res => {
//         const menu = res.data;
//         this.setState({ menu });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     axios
//       .get(API_URL + "keranjangs")
//       .then(res => {
//         const keranjang = res.data;
//         this.setState({ keranjang });
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }
//   componentDidUpdate(prevState) {
//     if (this.state.keranjang !== prevState.keranjang) {
//       axios
//         .get(API_URL + "keranjangs")
//         .then(res => {
//           const keranjang = res.data;
//           this.setState({ keranjang });
//         })
//         .catch(error => {
//           console.log(error);
//         })
//     }
//   }

//   changecategory = (value) => {
//     this.setState({
//       pilihcategory: value,
//       menu: []
//     })
//     axios
//       .get(API_URL + "products?category.nama=" + value)
//       .then(res => {
//         const menu = res.data;
//         this.setState({ menu });
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }
//   masukKeranjang = (value) => {
//     axios
//       .get(API_URL + "keranjangs?product.id=" + value.id)
//       .then((res) => {
//         if (res.data.length === 0) {
//           const keranjang = {
//             jumlah: 1,
//             total_harga: value.harga,
//             product: value,
//           };

//           axios
//             .post(API_URL + "keranjangs", keranjang)
//             .then((res) => {
//               swal({
//                 title: "Sukses Masuk Keranjang",
//                 text: "Sukses Masuk Keranjang " + keranjang.product.nama,
//                 icon: "success",
//                 button: false,
//                 timer: 1500,
//               });
//             })
//             .catch((error) => {
//               console.log("Error yaa ", error);
//             });
//         } else {
//           const keranjang = {
//             jumlah: res.data[0].jumlah + 1,
//             total_harga: res.data[0].total_harga + value.harga,
//             product: value,
//           };

//           axios
//             .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
//             .then((res) => {
//               swal({
//                 title: "Sukses Masuk Keranjang",
//                 text: "Sukses Masuk Keranjang " + keranjang.product.nama,
//                 icon: "success",
//                 button: false,
//                 timer: 1500,
//               });
//             })
//             .catch((error) => {
//               console.log("Error yaa ", error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log("Error yaa ", error);
//       });
//   };

//   render() {
//     const { menu, pilihcategory, keranjang } = this.state
//     return (
//       <div className="mt-2">
//         <div className="App">
//           <Container fluid>
//             <Row>
//               <ListCategories changecategory={this.changecategory} pilihcategory={pilihcategory} />
//               <Col>
//                 <h4 className="float-right"><strong>Daftar Menu </strong> </h4>
//                 <hr />
//                 <Row>
//                   {menu && menu.map((menu) => (
//                     <Menu
//                       key={menu.id}
//                       menu={menu}
//                       masukKeranjang={this.masukKeranjang}
//                     />
//                   ))}
//                 </Row>
//               </Col>
//               <Hasil keranjang={keranjang} />
//             </Row>
//           </Container>
//         </div>
//       </div>
//     )
//   }
// }
