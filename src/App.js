import "./App.css";
import { signInWithNearWallet, signOutNearWallet } from "./near-api";
import AccountInfo from "./components/AccountInfo";
import Markets from "./components/Markets";

function App() {
  const isSignedIn = window.walletConnection.isSignedIn();

  return (
    <div className="App">
      <header>
        {isSignedIn && (
          <button className="btn" type="button" onClick={signOutNearWallet}>
            Sign Out
          </button>
        )}
      </header>

      <main className="container">
        <h1>Welcome!</h1>
        {!isSignedIn ? (
          <div className="btn-block">
            <button
              className="btn"
              type="button"
              onClick={signInWithNearWallet}
            >
              Sign In
            </button>
          </div>
        ) : (
          <>
            <AccountInfo />
            <Markets />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
