import React, {useEffect, useState} from 'react';

function CompSystemHealth() {
    const [sys_health, setSystemHealth] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://fast-api-health-service.onrender.com/health');
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setSystemHealth(data);
                    console.log(data);
                }
            }
        } catch (error) {
            console.log(error);
            // document.getElementById('Notes').textContent = error;
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (sys_health.length === 0) {
            return;
        }
        document.getElementById('Notes').textContent = '';
        document.getElementById('cpuUsage').textContent = `${sys_health.cpu_usage}%`;
        document.getElementById('memoryUsage').textContent = `${sys_health.memory_usage}%`;
        document.getElementById('diskUsage').textContent = `${sys_health.disk_usage}%`;
        document.getElementById('bytesSent').textContent = `${sys_health.network.bytes_sent}`;
        document.getElementById('bytesReceived').textContent = `${sys_health.network.bytes_received}`;
        document.getElementById('batteryPercent').textContent = `${sys_health.battery.percent}%`;
        document.getElementById('powerPlugged').textContent = `${sys_health.battery.power_plugged || ''}`;
        document.getElementById('uptime').textContent = sys_health.uptime;

        // Add dynamic content for disk partitions
        const diskPartitionsTable = document.getElementById('diskPartitions');
        for (const [partition, info] of Object.entries(sys_health.disk_partitions)) {
            const row = diskPartitionsTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerText = `Partition ${partition}`;
            cell2.innerText = `Total: ${info.total || 'N/A'}`;
            cell3.innerText = `Free: ${info.free || 'N/A'}`;
        }

        // Swap Memory
        document.getElementById('swapTotal').textContent = `${sys_health.swap_memory.total}`;
        document.getElementById('swapUsed').textContent = `${sys_health.swap_memory.used}`;
        document.getElementById('swapFree').textContent = `${sys_health.swap_memory.free}`;

        // CPU Cores
        document.getElementById('logicalCores').textContent = `${sys_health.cpu_cores.logical}`;
        document.getElementById('physicalCores').textContent = `${sys_health.cpu_cores.physical}`;
    }, [sys_health]);

    return (
        <div>
            <div className="row" >
                <h1 className="col-md-6"> System information</h1>
            </div>
            <div className="mt-5">
                <div className="row">
                    {sys_health && (
                        <>
                            <div id="Notes"></div>
                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">CPU Usage</h5>
                                        <p>Percentage: <span id="cpuUsage"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Memory Usage</h5>
                                        <p>Percentage: <span id="memoryUsage"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Disk Usage</h5>
                                        <p>Percentage: <span id="diskUsage"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Network</h5>
                                        <p>Bytes Sent: <span id="bytesSent"></span></p>
                                        <p>Bytes Received: <span id="bytesReceived"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Battery</h5>
                                        <p>Percentage: <span id="batteryPercent"></span></p>
                                        <p>Power Plugged: <span id="powerPlugged"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Sensors</h5>
                                        {/* Display sensor information as needed */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Uptime</h5>
                                        <p id="uptime"></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Disk Partitions</h5>
                                        <table id="diskPartitions"></table>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">Swap Memory</h5>
                                        <p>Total: <span id="swapTotal"></span></p>
                                        <p>Used: <span id="swapUsed"></span></p>
                                        <p>Free: <span id="swapFree"></span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 mt-2">
                                <div className="card bg-dark text-white animated fadeInUp">
                                    <div className="card-body">
                                        <h5 className="card-title">CPU Cores</h5>
                                        <p>Logical: <span id="logicalCores"></span></p>
                                        <p>Physical: <span id="physicalCores"></span></p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompSystemHealth;