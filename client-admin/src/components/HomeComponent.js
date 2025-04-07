import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          CHÀO MỪNG ĐẾN VỚI TRANG QUẢN TRỊ
        </h2>
        <img
          src="https://htmlstream.com/front-dashboard/assets/svg/illustrations/oc-collaboration.svg"
          width="1000"
          height="800"
          alt="Admin Home"
          className="rounded-lg shadow-lg"
        />
      </div>
    );
  }
}

export default Home;
