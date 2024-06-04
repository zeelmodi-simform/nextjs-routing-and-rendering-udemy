export function GET(request) {
    // console.log({request});

    return Response.json({
        data: 'Hello'
    }, { status: 200 });
}
