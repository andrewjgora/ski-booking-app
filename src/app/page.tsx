import Link from "next/link";

export default function Page() {

  return (
    <main className="container mx-auto h-full p-8 prose">
      <h1>Welcome to SlopeFinder</h1>
      <h2>Discover the Ultimate Ski and Snowboard Deals</h2>
      <p>Welcome to SlopeFinder, the go-to platform for all your skiing and snowboarding adventures. Whether you’re a seasoned pro or hitting the slopes for the first time, we’ve got you covered with unbeatable deals on lift tickets, rentals, and more.</p>
      <h2>Your Adventure Starts Here</h2>
      <p>At SlopeFinder, we understand the thrill of the ride and the joy of carving through fresh powder. Our mission is to help you experience the best slopes without breaking the bank. We’ve partnered with top ski resorts across the country to bring you the best prices, so you can focus on what really matters – shredding with style.</p>
      <h2>Why SlopeFinder?</h2>
      <ul>
        <li><b>Exclusive Deals: </b>We hunt down the best offers so you don’t have to.</li>
        <li><b>Comprehensive Listings: </b>From big-name resorts to hidden gems, find the perfect spot for your next trip.</li>
        <li><b>User-Friendly: </b>Easy-to-navigate platform designed with snowboarders and skiers in mind.</li>
        <li><b>Community Vibes: </b>Join a community of fellow snow enthusiasts who live for the ride.</li>
      </ul>
      <h2>How It Works</h2>
      <ol>
        <li><b>Search: </b>Enter your destination or browse our top picks.</li>
        <li><b>Compare: </b>Check out the best deals on lift tickets, rentals, and packages.</li>
        <li><div className="badge badge-primary"><b>Coming Soon</b></div><b> Book: </b>Secure your spot and get ready to hit the slopes.</li>
        <li><div className="badge badge-primary"><b>Coming Soon</b></div><b> Shred: </b>Enjoy your adventure with the peace of mind that you got the best deal.</li>
      </ol>
      <h2>Ready to Ride?</h2>
      <p>Don’t let high prices keep you off the slopes. With SlopeFinder you can ride more, spend less, and keep your steez intact. Start planning your next adventure today!</p>

      <Link className="btn btn-primary w-1/2 mx-auto" href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}