import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, get_db
from main import app
import models

# Setup the test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_product():
    response = client.post(
        "/products",
        json={
            "name": "Test Product",
            "description": "Test Description",
            "price": 100.0,
            "stock": 10,
            "category": "Test Category",
            "isActive": True
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Product"
    assert "id" in data

def test_get_all_products():
    # Create a product first
    client.post(
        "/products",
        json={
            "name": "Product 1",
            "description": "Desc 1",
            "price": 10.0,
            "stock": 5,
            "category": "Cat 1",
            "isActive": True
        },
    )
    
    response = client.get("/products")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_get_product_by_id():
    # Create a product
    create_resp = client.post(
        "/products",
        json={
            "name": "Product to Get",
            "description": "Desc",
            "price": 20.0,
            "stock": 5,
            "category": "Cat",
            "isActive": True
        },
    )
    product_id = create_resp.json()["id"]
    
    response = client.get(f"/products/{product_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Product to Get"

def test_get_product_not_found():
    response = client.get("/products/9999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Product not found"

def test_update_product():
    # Create a product
    create_resp = client.post(
        "/products",
        json={
            "name": "Old Name",
            "description": "Old Desc",
            "price": 30.0,
            "stock": 2,
            "category": "Old Cat",
            "isActive": True
        },
    )
    product_id = create_resp.json()["id"]
    
    # Update it
    response = client.put(
        f"/products/{product_id}",
        json={
            "name": "New Name",
            "description": "New Desc",
            "price": 35.0,
            "stock": 3,
            "category": "New Cat",
            "isActive": False
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "New Name"
    assert data["isActive"] is False

def test_update_product_not_found():
    response = client.put(
        "/products/9999",
        json={
            "name": "New Name",
            "description": "New Desc",
            "price": 35.0,
            "stock": 3,
            "category": "New Cat",
            "isActive": False
        },
    )
    assert response.status_code == 404

def test_delete_product():
    # Create a product
    create_resp = client.post(
        "/products",
        json={
            "name": "To Delete",
            "description": "Desc",
            "price": 40.0,
            "stock": 1,
            "category": "Cat",
            "isActive": True
        },
    )
    product_id = create_resp.json()["id"]
    
    # Delete it
    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 204
    
    # Verify it's gone
    get_resp = client.get(f"/products/{product_id}")
    assert get_resp.status_code == 404

def test_delete_product_not_found():
    response = client.delete("/products/9999")
    assert response.status_code == 404

def test_create_product_invalid_data():
    response = client.post(
        "/products",
        json={
            "name": "Invalid Product",
            # Missing price and stock
            "category": "Test"
        },
    )
    assert response.status_code == 422 # Unprocessable Entity
