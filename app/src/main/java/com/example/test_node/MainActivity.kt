package com.example.test_node

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.test_node.databinding.ActivityMainBinding
import org.liquidplayer.service.MicroService


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    val TAG = "TAG"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val readyListener = MicroService.EventListener { service, _, _ ->
            service.emit("ping")
        }
        val pongListener = MicroService.EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("message")
            runOnUiThread { binding.txtMain.text = message }
        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("pong", pongListener)
            }
        val uri = MicroService.Bundle(this, "example")
        val service = MicroService(
            this, uri,
            startListener
        )
        service.start()
    }
}