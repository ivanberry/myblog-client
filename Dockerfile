FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_module/.bin` to $PATH
ENV PATH /usr/src/app/node_module/.bon:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/pageck.json
RUN npm install
RUN npm install react-scripts -g

# add app
ADD . /usr/src/app

# start app
CMD ['npm', 'start']
