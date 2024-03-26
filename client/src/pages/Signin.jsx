import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  //useState({})调用了useState函数，并且以一个空对象{}作为初始状态值。这意味着formData这个状态初始时是一个空对象，通常用来存储表单字段的值。
// useState函数返回一个数组，这个数组包含两个元素：
// 当前的状态值（在这个例子中是formData），它反映了状态的当前值。
// 一个让你更新这个状态的函数（在这个例子中是setFormData），你可以调用这个函数来更新状态，更新状态后组件会重新渲染以反映最新的状态。
  const [error, setError] = useState(null); //error初始值null
  const [loading, setloading] = useState(false); //loading初始值false
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true); //异步操作要开始了
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }); //请求的body是将formData状态转换为JSON字符串的结果。等待响应，然后将响应解析为JSON格式的数据。
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        setError(data.message);
        return;
      }
      setloading(false);
      setError(null); //清除之前的error信息
      navigate('/');
    } catch (error) {
      setloading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
