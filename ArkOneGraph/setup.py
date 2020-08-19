import os
from setuptools import setup

# Utility function to read the README file.
# Used for the long_description.  It's nice, because now 1) we have a top level
# README file and 2) it's easier to type in the README file than to put a raw
# string in below ...
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "Arknight AutoPlanner",
    version = "0.0.4",
    author = "YC.Remar",
    author_email = "ethan.ycx@gmail.com",
    description = ("A tiny program that helps on material planning in Arknight"),
    # url = "http://packages.python.org/an_example_pypi_project",
    install_requires=[
        "numpy",
        "scipy",
        "sanic"
      ],
)