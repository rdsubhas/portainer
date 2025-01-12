package chisel

import (
	"net"
	"net/http"
	"testing"
	"time"

	portainer "github.com/portainer/portainer/api"

	"github.com/stretchr/testify/require"
)

func TestPingAgentPanic(t *testing.T) {
	endpointID := portainer.EndpointID(1)

	s := NewService(nil, nil, nil)

	defer func() {
		require.Nil(t, recover())
	}()

	mux := http.NewServeMux()
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(pingTimeout + 1*time.Second)
	})

	ln, err := net.ListenTCP("tcp", &net.TCPAddr{IP: net.IPv4(127, 0, 0, 1), Port: 0})
	require.NoError(t, err)

	go func() {
		require.NoError(t, http.Serve(ln, mux))
	}()

	s.getTunnelDetails(endpointID)
	s.tunnelDetailsMap[endpointID].Port = ln.Addr().(*net.TCPAddr).Port

	require.Error(t, s.pingAgent(endpointID))
}
