import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = 'access-secret-key-for-learning'

// --- Auth Middleware ---
// C4 diagram: c4-level4-auth-middleware.puml
//
// This middleware protects routes that require authentication.
// It reads the access token from the Authorization header,
// verifies it, and attaches the user's email to req.user.
//
// Usage: app.get('/protected', authMiddleware, protectedHandler)

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // 1. Read Authorization header
  const authHeader = req.headers.authorization

  // 2. Check it exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access token required' })
    return
  }

  // 3. Extract the token (everything after "Bearer ")
  const token = authHeader.split(' ')[1]

  // 4. Verify the JWT
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { email: string }

    // 5. Attach user email to the request object
    //    Now route handlers can access req.user to know who's making the request
    ;(req as any).user = decoded.email

    // 6. Proceed to the next middleware / route handler
    next()
  } catch (err: any) {
    // 7. Handle specific JWT errors
    if (err.name === 'TokenExpiredError') {
      // Access token expired — client should call POST /refresh-tokens
      res.status(401).json({ message: 'Access token expired' })
      return
    }
    // Any other error (tampered token, wrong signature, etc.)
    res.status(401).json({ message: 'Invalid access token' })
  }
}
