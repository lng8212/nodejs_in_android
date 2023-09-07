package com.example.test_node

import android.net.wifi.WifiManager
import android.os.Bundle
import android.text.format.Formatter
import androidx.appcompat.app.AppCompatActivity
import com.example.test_node.databinding.ActivityMainBinding
import org.json.JSONObject
import org.liquidplayer.service.MicroService
import org.liquidplayer.service.MicroService.EventListener


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    val TAG = "TAG"

    private lateinit var readyListener: EventListener
    private lateinit var pongListener: EventListener

    private lateinit var service: MicroService
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        getIP()
        setUpClick()
        handleNode()
    }

    private fun handleNode() {
        readyListener = EventListener { service, _, _ ->
//            val payload = JSONObject()
//            payload.put("hallo", "die Weld")
//            service.emit("ping", payload)
        }
        pongListener = EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("message")
            runOnUiThread {
//                binding.txtMain.text = message
            }
        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("pong", pongListener)
            }
        val uri = MicroService.Bundle(this, "example")
        service = MicroService(
            this, uri,
            startListener
        )
        service.start()
    }

    private fun getIP() {
        val wifiManager = getSystemService(WIFI_SERVICE) as WifiManager
        val ipAddress: String = Formatter.formatIpAddress(wifiManager.connectionInfo.ipAddress)
        binding.txtIp.text = ipAddress
    }

    private fun setUpClick() {
        binding.run {
            btnPair.setOnClickListener {
                val payload = JSONObject()
                payload.put("pair", "pair")
                service.emit("pingPair", payload)
            }
            btnConnect.setOnClickListener {
                val payload = JSONObject()
                payload.put("connect", "connect")
                service.emit("pingConnect", payload)
            }
            btnVolPlus.setOnClickListener {
                val payload = JSONObject()
                payload.put("volPlus", "volPlus")
                service.emit("pingVolPlus", payload)
            }
            btnVolMinus.setOnClickListener {
                val payload = JSONObject()
                payload.put("volMinus", "volMinus")
                service.emit("pingVolMinus", payload)
            }
            btnMenu.setOnClickListener {
                val payload = JSONObject()
                payload.put("menu", "menu")
                service.emit("pingMenu", payload)
            }
            btnHome.setOnClickListener {
                val payload = JSONObject()
                payload.put("home", "home")
                service.emit("pingHome", payload)
            }

        }
    }
}