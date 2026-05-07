from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

def seed_data():
    db = SessionLocal()
    try:
        if db.query(models.Product).first():
            print("Database has been seeded.")
            return

        print("Seeding in process...")
        
        sample_products = [
            {
                "name": "Laptop Pro X1",
                "description": "Laptop kencang untuk programming dan desain.",
                "price": 15000000,
                "stock": 10,
                "category": "Elektronik",
                "isActive": True
            },
            {
                "name": "Mechanical Keyboard K3",
                "description": "Keyboard tactile dengan switch biru.",
                "price": 850000,
                "stock": 25,
                "category": "Elektronik",
                "isActive": True
            },
            {
                "name": "Kaos Polos Cotton",
                "description": "Bahan katun dingin dan nyaman.",
                "price": 75000,
                "stock": 100,
                "category": "Pakaian",
                "isActive": True
            },
            {
                "name": "Kopi Arabika 250g",
                "description": "Biji kopi pilihan dari pegunungan.",
                "price": 55000,
                "stock": 0,
                "category": "Makanan",
                "isActive": False
            }
        ]

        for p in sample_products:
            product = models.Product(**p)
            db.add(product)
        
        db.commit()
        print("Seeding succeed!")
        
    except Exception as e:
        print(f"Something went wrong: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()