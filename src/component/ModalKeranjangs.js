import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const ModalKeranjangs = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changehandle, handleSubmit, totalharga, hapusPesanan }) => {
    if (keranjangDetail) {

        return (

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}{" "}
                        <strong>
                            (Rp.{numberWithCommas(keranjangDetail.product.harga)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>
                                    Rp.{numberWithCommas(totalharga)}
                                </strong>

                            </p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah :</Form.Label>
                            <br />
                            <Button variant="info" size="sm" className="ml-2" onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            {" "}<strong>{jumlah}</strong>{" "}
                            <Button variant="info" size="sm" className="mr-2" onClick={() => tambah()} >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>keterangan </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="contoh: Pedas,Sedang "
                                value={keterangan}
                                onChange={(event) => changehandle(event)} />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)} >
                        <FontAwesomeIcon icon={faTrash} />
                        Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    else {
        return (

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalKeranjangs
