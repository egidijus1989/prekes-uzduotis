import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OurProduct from "../OurProduct/OurProduct";
import * as service from "../../servises/ProductServices";

export default function OurProductList() {
  //////////////////////////////////////////////States//////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [ourProducts, setOurProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productIdToEdit, setProductIdToEdit] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
  });
  const token = currentUser.data.access_token;
  const { id } = useParams();
  //////////////////////////////////////////////Services/////////////////////////////////////////////////////////////////
  const handleDeleteProduct = () => {
    service.handleDeleteProduct(productIdToDelete, token, setOurProducts);
  };

  useEffect(() => {
    const getOurProducts = () => {
      service.fetchOurProducts(token, setOurProducts);
    };
    getOurProducts();
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    service.handleSubmit(
      token,
      formData.title,
      formData.price,
      formData.image,
      formData.description
    );
  };

  const editProduct = (e) => {
    e.preventDefault();
    service.editSubmit(
      token,
      editedProduct.title,
      editedProduct.price,
      editedProduct.image,
      editedProduct.description,
      productIdToEdit
    );
  };
  return (
    <div className="container">
      {/* //////////////////////////////////////////////////Products//////////////////////////////////////////////////////////// */}
      {currentUser ? (
        <button
          type="button"
          className="btn btn-primary mt-5"
          data-bs-toggle="modal"
          data-bs-target="#pridejimoModalas"
        >
          Pridėti prekę
        </button>
      ) : (
        <></>
      )}
      {currentUser && ourProducts.length > 0 ? (
        <table className="table my-5 table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pavadinimas</th>
              <th scope="col">Kaina</th>
              <th scope="col">Aprašymas</th>
              <th scope="col">Pakeisti</th>
              <th scope="col">Ištrinti</th>
            </tr>
          </thead>
          {ourProducts.map((ourProduct) => (
            <tbody key={ourProduct.id}>
              <tr>
                <td scope="row">{ourProduct.id}</td>
                <td scope="row">{ourProduct.title}</td>
                <td scope="row">{ourProduct.price}</td>
                <td scope="row">{ourProduct.description}</td>
                <td scope="row">
                  <button
                    className="btn btn-success underline:cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#atnaujinimoModalas"
                    onClick={() => {
                      setProductIdToEdit(ourProduct.id);
                    }}
                  >
                    Pakeisti
                  </button>
                </td>
                <td scope="row">
                  <button
                    className="btn btn-danger underline:cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#trinimoModalas"
                    onClick={() => {
                      setProductIdToDelete(ourProduct.id);
                    }}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className="my-5 mx-auto">Jūs neturite produktų</p>
      )}
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <div
        className="modal fade"
        id="trinimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Prekės trinimas
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Ar tikrai norite ištrinti prekę?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Ne, nenoriu
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleDeleteProduct}
              >
                Taip, noriu
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div
        className="modal fade"
        id="pridejimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Prekės pridėjimas
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={addProduct}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prekės pavadinimas"
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prekės kaina"
                    id="price"
                    name="price"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Prekės nuotrauka"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prekės aprašymas"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Pridėti prekę
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div
        className="modal fade"
        id="atnaujinimoModalas"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Informacijos apie prekę atnaujinimas
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={editProduct}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prekės pavadinimas"
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="prekes kaina"
                    id="price"
                    name="price"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Prekės nuotrauka"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        image: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prekės aprašymas"
                    id="description"
                    name="description"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Atnaujinti prekę
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
