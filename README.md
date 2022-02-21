# Ice-cold starts

This repository is an example [serverless](https://github.com/serverless/serverless) project, which replicates cold starts caused by function timeouts or out of memory errors.

You can deploy this yourself with `serverless deploy`.

Trigger a `timeout` by passing `{"timeout": true}` to the `/iceColdStartTimeout` endpoint.

Trigger a `out of memory` error by passing `{"oom": true}` to the `/iceColdStartError` endpoint.

The companion post for this is available here.
