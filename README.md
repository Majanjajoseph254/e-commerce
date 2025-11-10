# Fashion Shop E-commerce

A responsive e-commerce website for a fashion store located in Nairobi, Kenya. Features a shopping cart system and user authentication, all powered by client-side storage.

## Features

### Shopping Cart
- Add/remove items to cart
- Adjust quantities with increment/decrement controls
- Cart persists across page refreshes (localStorage)
- Modal cart interface with clear cart option
- Real-time total calculation
- Cart item count indicator

### User Authentication
- User registration with email
- Login/logout functionality
- Form validation and error handling
- Session persistence (localStorage)
- Responsive auth modals
- Password confirmation on signup
- Unique email validation

### Product Display
- Featured collections
- Top sales section
- New arrivals
- Hot sales items
- Product categorization
- Color variants
- Price display
- Rating system

### Shop Location
- Interactive Google Maps integration
- Located at: CBD Shop No 102, Waiyaki Way, Nairobi
- Contact information and form

### Responsive Design
- Mobile-friendly navigation
- Responsive product grid
- Adaptive cart and auth modals
- Flexible layout for all screen sizes

## Setup and Usage

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Create an account using the Sign Up option
4. Browse products and add them to cart
5. Access your cart via the Cart button
6. Manage quantities or remove items as needed

## Technical Details

### Local Storage Keys
- `cart`: Stores the shopping cart items
- `shop_users`: Stores registered user accounts
- `shop_current_user`: Stores current user session

### File Structure
- `index.html`: Main markup and structure
- `style.css`: Styling and responsive design rules
- `script.js`: Cart and authentication functionality

## Development

To modify or enhance the project:

1. Edit `index.html` for structural changes
2. Modify `style.css` for styling updates
3. Update `script.js` for functionality changes

### Adding Products

Add new products by following the existing HTML structure:

```html
<div class="best-p1">
    <img src="product-image.jpg" alt="Product Name">
    <div class="best-p1-txt">
        <div class="name-of-p">
            <p>Product Name</p>
        </div>
        <div class="price">
            &dollar;XX.XX
        </div>
        <!-- ... rating and color options ... -->
    </div>
</div>
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Other modern browsers with localStorage support

## Future Enhancements

Planned features:
- Password strength requirements
- Password reset functionality
- User profile management
- Order history
- Wishlist functionality
- Product search/filter

## Contributing

Feel free to fork the project and submit pull requests for any improvements.

## License

This project is open-source and available under the MIT License.