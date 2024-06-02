import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <div className="container-fluid" style={{backgroundColor: '#0F111C', height: '100%'}}>
      <div className="mt-5 row d-flex flex-row justify-content-center">
          <form className="col-4 p-4" style={{backgroundColor: '#FFF'}}>
            Login
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    </div>
  )
}
