"""
Basically this file is called Web server gateway interface(WSGI).
This is used when the deployment platform is expecting static or even serverless functions.

make sure a wsgi is installed (such as gunicorn)

"""

from app import app

if __name__ == "__main__":
    """
    For debugging in local environment
    """

    # Run the server for debugging
    app.run(debug=True)
