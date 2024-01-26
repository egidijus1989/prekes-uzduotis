import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OurProduct from "../OurProduct/OurProduct";

export default function OurProductList() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [ourProducts, setOurProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productIdToEdit, setProductIdToEdit] = useState("");
  const [formData, setFormData] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const fetchOurProducts = async () => {
      try {
        const res = await fetch(`https://demo-api.ideabridge.lt/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + currentUser.data.access_token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setOurProducts(data.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOurProducts();
  }, []);

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(
        `https://demo-api.ideabridge.lt/api/products/${productIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + currentUser.data.access_token,
          },
        }
      );
      const data = await res.json();
      setOurProducts((prev) =>
        prev.filter((ourProduct) => ourProduct.id !== productIdToDelete)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://demo-api.ideabridge.lt/api/products`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer" + currentUser.data.access_token,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://demo-api.ideabridge.lt/api/products/${productIdToEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + currentUser.data.access_token,
          },
          body: JSON.stringify(editedProduct),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="container">
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
              <form action="" onSubmit={handleSubmit}>
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
              <form action="" onSubmit={editSubmit}>
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
                    placeholder="Prekės kaina"
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
                {/* <div className="mb-3">
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
                        image: e.target.files,
                      })
                    }
                  />
                </div> */}
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
