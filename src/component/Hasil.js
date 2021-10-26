import axios from 'axios';
import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import swal from 'sweetalert';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';
import ModalKeranjangs from './ModalKeranjangs';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: 0,
            jumlah: 0,
            keterangan: '',
            totalharga: 0,
        }
    }
    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalharga: menuKeranjang.total_harga
        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }
    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalharga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }
    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalharga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)

            })
        }

    }

    changehandle = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalharga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        };

        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Update Pesanan",
                    text: "Sukses Update " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });

        this.handleClose();

    }
    hapusPesanan = (id) => {



        axios
            .delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Hapus Pesanan",
                    text: "Sukses Hapus " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });

        this.handleClose();

    }


    render() {
        const { keranjang } = this.props;
        return (
            <Col md={3} mt="2" className="mt-4">
                <h4><strong>Hasil</strong> </h4>
                <hr />
                {keranjang.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjang.map((menuKeranjang) => (

                                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>

                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {menuKeranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h6>{menuKeranjang.product.nama}</h6>
                                            <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right">
                                                Rp. {numberWithCommas(menuKeranjang.total_harga)}
                                            </strong>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                            <ModalKeranjangs
                                handleClose={this.handleClose}
                                {...this.state}
                                tambah={this.tambah}
                                kurang={this.kurang}
                                changehandle={this.changehandle}
                                handleSubmit={this.handleSubmit}
                                hapusPesanan={this.hapusPesanan}
                            />
                        </ListGroup>
                    </Card>


                )}
                <TotalBayar keranjang={keranjang}  {...this.props} />
            </Col>
        )
    }
}
