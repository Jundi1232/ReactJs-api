
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalbayar) => {
        const pesanan = {
            total_bayar: totalbayar,
            menu: this.props.keranjang
        }
        axios.post(API_URL + "pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    }
    render() {
        const totalbayar = this.props.keranjang.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>
                {/* Web */}
                <div className="fixed-bottom d-none d-md-block ">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga :{" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalbayar)}
                                </strong>
                            </h4>
                            <Button
                                variant="primary"
                                block
                                className="mb-2 mt-4 mr-2"
                                size="lg"
                                onClick={() => this.submitTotalBayar(totalbayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* Mobile  */}
                <div className="d-sm-block d-md-none">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga :{" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalbayar)}
                                </strong>
                            </h4>
                            <Button
                                variant="primary"
                                block
                                className="mb-2 mt-4 mr-2"
                                size="lg"
                                onClick={() => this.submitTotalBayar(totalbayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
