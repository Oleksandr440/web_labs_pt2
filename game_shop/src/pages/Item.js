import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesData } from '../data/games';
import PrimaryButton from '../components/ui/PrimaryButton';

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const game = gamesData.find(g => g.id === parseInt(id));

  if (!game) return <h2 style={{padding: '40px', color: 'white'}}>Game not found!</h2>;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    
    if (!isNaN(value) && value >= 1) {
        setQuantity(value);
    } 
  };

  const totalPrice = (game.price * quantity).toFixed(2);

  return (
    <div className="item-page-container">
      <div className="item-layout">
        
        <div className="item-image-section">
            <img src={game.image} alt={game.title} className="item-hero-image" />
        </div>

        <div className="item-info-section">
            <div className="item-tags">
                <span className="tag">RPG</span>
                <span className="tag">Action</span>
            </div>
            
            <h1>{game.title}</h1>
            
            <p className="item-description-full">
                {game.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nunc maximus, nulla ut commodo sagittis.
            </p>

            <div className="item-meta-fields">
                <div className="field-group">
                <label>Quantity</label>
                    <input 
                        type="number" 
                        min="1"
                        className="ui-input" 
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <div className="field-group">
                    <label>Selectable Field (Platform)</label>
                    <select className="ui-select-input">
                        <option>PC</option>
                        <option>PlayStation 5</option>
                        <option>Xbox Series X</option>
                    </select>
                </div>
            </div>

            <div className="item-rating-date">
                <p>Rating: <strong>{game.rating}/10</strong></p>
                <p>Release: <strong>{game.releaseDate}</strong></p>
            </div>
        </div>
      </div>

      <div className="item-footer-actions">
          <h2 className="price-tag">Price: ${game.price.toFixed(2)}</h2>
          <div className="action-buttons">
              <button className="secondary-btn" onClick={() => navigate(-1)}>
                  Go back
              </button>
              <PrimaryButton text="Add to cart" onClick={() => alert('Added!')} />
          </div>
      </div>
    </div>
  );
};

export default Item;