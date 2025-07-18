import { useState, useEffect } from "react";
import { useCrypto } from "../contexts/CryptoContext";
import {
  TrendingUp,
  TrendingDown,
  Trash2,
  Plus,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import CircularProgress from "./CircularProgress";

// --- AddCoinModal Component ---
const AddCoinModal = ({ onClose, onAdd }) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error("Failed to fetch coins:", err));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selected || !amount) return;
    const coin = {
      id: selected.id,
      name: selected.name,
      symbol: selected.symbol,
      image: selected.image,
      current_price: selected.current_price,
      price_change_percentage_24h: selected.price_change_percentage_24h,
      amount: parseFloat(amount),
    };
    onAdd(coin);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-white">Add Cryptocurrency</h2>
        <input
          type="text"
          placeholder="Search coin by name or symbol"
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-h-40 overflow-y-auto bg-slate-800 rounded-lg">
          {filteredCoins.slice(0, 10).map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelected(coin)}
              className={`flex items-center p-2 cursor-pointer hover:bg-slate-700 ${
                selected?.id === coin.id ? "bg-slate-700" : ""
              }`}
            >
              <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-3" />
              <span className="text-white">
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </div>
          ))}
        </div>
        {selected && (
          <input
            type="number"
            placeholder="Amount you own"
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        )}
        <div className="flex justify-end space-x-4 pt-2">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Add Coin
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Portfolio Component ---
const Portfolio = () => {
  const { portfolio, removeFromPortfolio, addToPortfolio } = useCrypto();
  const [showModal, setShowModal] = useState(false);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);

  const totalValue = portfolio.reduce(
    (sum, coin) => sum + coin.current_price * coin.amount,
    0
  );

  const totalChange = portfolio.reduce((sum, coin) => {
    const coinValue = coin.current_price * coin.amount;
    const change = (coin.price_change_percentage_24h / 100) * coinValue;
    return sum + change;
  }, 0);

  const changePercentage =
    totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;

  if (portfolio.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl flex items-center justify-center mb-8">
          <PieChart className="w-12 h-12 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Your Portfolio is Empty
        </h2>
        <p className="text-xl text-slate-400 mb-8 max-w-md">
          Start building your crypto portfolio by adding some coins and track
          your investments.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
        >
          <Plus className="w-6 h-6 mr-3" />
          Add Your First Cryptocurrency
        </button>
        {showModal && (
          <AddCoinModal
            onClose={() => setShowModal(false)}
            onAdd={(coin) => addToPortfolio(coin)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Portfolio</h1>
        <p className="text-slate-400">
          Track your cryptocurrency investments and performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 card-dark">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-300 mb-1">
                Total Portfolio Value
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-white">
                  {formatCurrency(totalValue)}
                </span>
                <div
                  className={`flex items-center space-x-1 ${
                    changePercentage >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {changePercentage >= 0 ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                  <span className="font-semibold">
                    {Math.abs(changePercentage).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <CircularProgress
                percentage={Math.min(Math.abs(changePercentage), 100)}
                size={120}
                strokeWidth={8}
                color={changePercentage >= 0 ? "#10b981" : "#ef4444"}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
              <div className="text-2xl font-bold text-white">
                {portfolio.length}
              </div>
              <div className="text-sm text-slate-400">Assets</div>
            </div>
            <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
              <div
                className={`text-2xl font-bold ${
                  totalChange >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {formatCurrency(Math.abs(totalChange))}
              </div>
              <div className="text-sm text-slate-400">24h Change</div>
            </div>
            <div className="text-center p-4 bg-slate-800/30 rounded-2xl">
              <div className="text-2xl font-bold text-white">$0.00</div>
              <div className="text-sm text-slate-400">Available</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-dark">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full btn-primary" onClick={() => setShowModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Buy Crypto
              </button>
              <button className="w-full btn-secondary">
                <TrendingUp className="w-5 h-5 mr-2" />
                Sell Crypto
              </button>
              <button className="w-full btn-secondary">
                <DollarSign className="w-5 h-5 mr-2" />
                Deposit USD
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-dark">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Your Holdings</h3>
          <button className="btn-secondary" onClick={() => setShowModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Asset
          </button>
        </div>

        <div className="space-y-4">
          {portfolio.map((coin) => {
            const coinValue = coin.current_price * coin.amount;
            const coinChange =
              (coin.price_change_percentage_24h / 100) * coinValue;
            const allocation =
              totalValue > 0 ? (coinValue / totalValue) * 100 : 0;

            return (
              <div key={coin.id} className="portfolio-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{coin.name}</h4>
                      <p className="text-slate-400 text-sm">
                        {coin.amount.toFixed(6)} {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-bold text-white">
                      {formatCurrency(coinValue)}
                    </div>
                    <div
                      className={`text-sm flex items-center justify-center ${
                        coinChange >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {coinChange >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-white font-semibold">
                      {allocation.toFixed(1)}%
                    </div>
                    <div className="w-16 h-2 bg-slate-700 rounded-full mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${Math.min(allocation, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromPortfolio(coin.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <AddCoinModal
          onClose={() => setShowModal(false)}
          onAdd={(coin) => addToPortfolio(coin)}
        />
      )}
    </div>
  );
};

export default Portfolio;
