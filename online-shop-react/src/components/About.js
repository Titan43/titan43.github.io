import '../stylesheets/headers.css';
import '../stylesheets/item.css';

function About(props) {
    return (
      <div className='hero About'>
            <div className = 'item'>
			<div className ='overlay'></div>
			        <div className='item'>
				        <h2>Welcome to the Online Shop</h2>
				        <p>Welcome to our online shop, where you can find a wide range of high-quality products at competitive prices! Our goal is to provide our customers with a seamless shopping experience from the comfort of their own homes.</p>
			        </div>
			    <div className='item'>
				        <h2>Exceptional customer service</h2>
                        <p>We pride ourselves on our exceptional customer service, and our team is always ready to assist you with any questions or concerns you may have. Whether you're looking for the latest electronics, stylish clothing, or unique home decor, we have something for everyone.</p>
			        </div>
			    <div className='item'>
				    <h2>Best value</h2>
                    <p>At our online shop, we believe in offering our customers the best possible value for their money. That's why we're committed to providing top-quality products at affordable prices. Plus, with our easy-to-use website and secure payment system, shopping with us is both convenient and safe.</p>
			    </div>
			    <div className='item'>
				    <h2>Stop waiting, just DO IT!</h2>
                    <p>So why wait? Start exploring our wide selection of products today and discover the best online shopping experience around!</p>
			    </div>
			</div>
      </div>
    );
}
export default About;