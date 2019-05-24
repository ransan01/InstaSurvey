FROM oraclelinux:7.6

RUN yum install -y which

RUN yum install -y grep

RUN yum install -y mlocate && \
    updatedb

RUN yum install -y sudo && \
    curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash - && \
    yum install -y nodejs && \
    rm -rf /var/cache/yum

RUN yum install -y wget

RUN yum install -y make

RUN yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel -y && \
    yum install gcc perl-ExtUtils-MakeMaker -y && \
    yum remove git -y && \
    cd /usr/src && \
    wget https://www.kernel.org/pub/software/scm/git/git-2.21.0.tar.gz && \
    tar xzf git-2.21.0.tar.gz && \
    cd git-2.21.0 && \
    make prefix=/usr/local/git all && \
    make prefix=/usr/local/git install && \
    echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc && \
    source /etc/bashrc

RUN npm install -g @angular/cli

RUN cd /home && \
    rm -rf InstantSurvey && \
    /usr/local/git/bin/git clone --depth 1  https://github.com/ransan01/InstantSurvey.git && \
    cd InstantSurvey/client && \
    npm install && \
    cd ../server && \
    npm install
    
ENTRYPOINT [ "/bin/bash" ]
