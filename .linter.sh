#!/bin/bash
cd /home/kavia/workspace/code-generation/openshopease-64160-384ecf2c/openshopease_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

